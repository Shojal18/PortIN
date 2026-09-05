# FreightIQ — Intelligent Freight Forecasting & Vessel Charter Decision-Support Platform

**Smart India Hackathon 2026 Prototype**

FreightIQ is an end-to-end intelligent maritime analytics and vessel chartering decision-support platform designed for dry bulk logistics managers moving raw materials (Thermal Coal, Coking Coal, Iron Ore, Grain, Fertilizer, Bauxite) from major global exporting nations to Indian East Coast ports (Paradip, Visakhapatnam, Gangavaram, Gopalpur, Dhamra, Sagar–Sandheads, and Haldia).

---

## 1. The Core Problem & Solution

### The Problem
Chartering dry bulk vessels for Indian East Coast importation is traditionally reactive and fragmented:
1. **Volatile Freight Rates**: Freight rates swing 15%–40% within weeks based on seasonal demand, bunker fuel prices, and macro cycles.
2. **Physical Port Restrictions**: Many ports (e.g., Paradip 14.5m draft, Haldia 8.5m riverine draft) cannot physically accommodate Capesize or fully loaded Panamax vessels without severe grounding risk or expensive lighterage.
3. **Hidden Voyage Costs & Congestion**: Selecting the cheapest nominal vessel often leads to multi-day waiting penalties (demurrage) and fuel surcharges.

### The FreightIQ Solution
FreightIQ unifies:
1. **AI Time-Series Freight Forecasting** (Prophet / Multi-Factor SARIMA decomposition) with 95% confidence intervals.
2. **Deterministic Physical Port Feasibility Engine** (evaluating Draft, LOA, Beam, and DWT capacity against authentic port limits).
3. **Comprehensive Voyage Cost Optimization** (calculating Freight + Bunker Fuel + Port Dues + Congestion Idle-time surcharges per metric ton).
4. **Optimal Entry Window Detection** (identifying the lowest-rate chartering window and quantifying percentage savings vs current spot rate).
5. **Maritime Operational Risk Assessment** (monitoring berth congestion, weather/monsoon surges, and forward rate volatility).

---

## 2. Key Architecture

```text
┌────────────────────────────────────────────────────────┐
│              FreightIQ Frontend (React + Vite)         │
│  Tailwind CSS · Recharts · Lucide Icons · TS           │
└───────────────────────────┬────────────────────────────┘
                            │ REST / JWT Auth
┌───────────────────────────▼────────────────────────────┐
│          Backend API & Orchestration (Node.js/Express) │
│  - Feasibility Engine (Draft / LOA / Beam / DWT)       │
│  - Cost Optimization & Ranking Algorithm               │
│  - Optimal Window Rolling Analyzer                     │
│  - Multi-Factor Risk Assessment Engine                 │
└─────────────┬───────────────────────────┬──────────────┘
              │                           │
┌─────────────▼─────────────┐   ┌─────────▼──────────────┐
│  Python ML Microservice   │   │   PostgreSQL Database  │
│  (FastAPI + statsmodels / │   │   & Redis Cache        │
│   Prophet Time-Series)    │   │   (Historical Rates &  │
│                           │   │    Reference Limits)   │
└───────────────────────────┘   └────────────────────────┘
```

---

## 3. Quick Start

### Standalone Docker-Compose (All Microservices)
To launch all 5 containers (PostgreSQL, Redis, Python ML service, Node API, and Frontend):

```bash
docker-compose up --build
```

### Microservice Endpoints:
- **Frontend Web UI**: `http://localhost:3000`
- **Node.js Orchestration API**: `http://localhost:5000`
- **Python ML FastAPI Engine**: `http://localhost:8000`
- **ML Swagger Documentation**: `http://localhost:8000/docs`
- **PostgreSQL Database**: `localhost:5432` (db: `freightiq`, user: `postgres`)

---

## 4. Demo Login Credentials

For demonstration and hackathon evaluation:
- **Email**: `manager@freightiq.demo`
- **Password**: `admin123`
- **One-Click Demo Button**: Available on the login screen to quickly load Capt. Samarth's profile.

---

## 5. Authentic Reference Data vs. Synthetic Data Disclosure

In strict compliance with Smart India Hackathon guidelines:

### Authentic Real Public Reference Data
- **Port Physical Limitations**: Maximum draft, maximum LOA (length overall), maximum beam, handling rate (MT/day), and berth constraints for Indian East Coast Ports (Paradip, Visakhapatnam, Gangavaram, Gopalpur, Dhamra, Sagar–Sandheads, Haldia).
- **Vessel Class Specifications**: Standard naval architectural parameters for **Handysize** (30–40k DWT), **Supramax** (50–64k DWT), **Panamax** (65–82k DWT), and **Capesize** (110–180k DWT).
- **Geographic Distances**: Authentic nautical distances (in Nautical Miles) between global export terminals (Australia, USA, Mozambique, Russia, Indonesia) and Indian East Coast destinations.

### Synthetic / Demo Historical Data
- **Historical Freight Rate Indices, Bunker Fuel Time Series, and Port Congestion Indices**: Synthetic 3-year historical dataset generated via multi-factor econometric equations (incorporating annual monsoonal seasonality, macroeconomic shipping cycles, VLSFO fuel sensitivity, and stochastic noise).
- *Reason*: Commercial Baltic Dry Index (BDI) and Platts live fixtures require proprietary enterprise feeds not freely licensed for public hackathon prototypes.

---

## 6. Business Logic: Why Supramax over Capesize?

FreightIQ **never** assumes *"larger vessel is always better"*.
For example, for **120,000 MT Thermal Coal from Australia to Paradip**:
1. **Capesize**: Has the lowest theoretical freight rate ($15.10/MT), but **fails Paradip's 14.5m draft limit** (Capesize draft: 16.5m–18.5m). Direct berthing would risk grounding.
2. **Supramax**: Has 12.8m draft, 199m LOA, and 32.2m beam — **100% physically compatible** with Paradip's mechanized coal berths.
3. **Total Voyage Cost**: After accounting for lighterage prevention, fuel consumption, and fast self-unloading geared cranes, **Supramax is mathematically ranked #1 Recommended** at **$18.00/MT**.

---

*Built with precision for Smart India Hackathon 2026.*
