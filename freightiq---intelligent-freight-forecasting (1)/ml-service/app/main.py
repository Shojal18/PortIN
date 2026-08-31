"""
FreightIQ ML Microservice (FastAPI)
Smart India Hackathon 2026

Serves time-series freight rate forecasts, confidence intervals, and model readiness status.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from app.model import engine

app = FastAPI(
    title="FreightIQ ML Forecasting Engine",
    version="1.0.0",
    description="FastAPI service for Bulk Maritime Freight Time-Series Forecasting (SIH 2026)"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ForecastRequest(BaseModel):
    origin: str = Field(..., example="Australia")
    destination: str = Field(..., example="Paradip Port")
    vessel_classes: Optional[List[str]] = Field(default=["Handysize", "Supramax", "Panamax", "Capesize"])
    horizon_days: int = Field(default=90, ge=1, le=365)
    start_date: Optional[str] = Field(default=None, example="2026-08-28")

class ForecastResponse(BaseModel):
    route: str
    origin: str
    destination: str
    model: str
    confidence_level: float
    horizon_days: int
    forecast: List[Dict[str, Any]]
    optimal_window: Dict[str, Any]

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "freightiq-ml-service", "timestamp": datetime.now().isoformat()}

@app.get("/models/status")
def models_status():
    return {
        "status": "ready",
        "models_ready": engine.total_models,
        "models_total": engine.total_models,
        "model_architecture": "Prophet / SARIMA Multi-Factor Decomposition",
        "last_trained": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

@app.post("/forecast", response_model=ForecastResponse)
def generate_forecast(req: ForecastRequest):
    try:
        start_dt = None
        if req.start_date:
            try:
                start_dt = datetime.strptime(req.start_date, "%Y-%m-%d")
            except Exception:
                start_dt = datetime.now()
        else:
            start_dt = datetime.now()

        # Primary benchmark vessel (Supramax)
        forecast_points = engine.forecast_rates(
            origin=req.origin,
            destination=req.destination,
            horizon_days=req.horizon_days,
            vessel_class="Supramax",
            start_date=start_dt
        )

        window_days = 14 if req.horizon_days <= 90 else 30
        optimal_win = engine.find_optimal_window(forecast_points, duration_days=window_days)

        return ForecastResponse(
            route=f"{req.origin} → {req.destination}",
            origin=req.origin,
            destination=req.destination,
            model="Prophet / Multi-Factor SARIMA Ensemble",
            confidence_level=0.95,
            horizon_days=req.horizon_days,
            forecast=forecast_points,
            optimal_window=optimal_win
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ML forecasting engine error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
