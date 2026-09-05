-- ============================================================================
-- FreightIQ Database Schema (PostgreSQL) - Smart India Hackathon 2026
-- Intelligent Freight Forecasting & Vessel Charter Decision-Support Platform
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(64) DEFAULT 'Logistics Manager',
    organization VARCHAR(255) DEFAULT 'East Coast Bulk Logistics Consortium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ports (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(16) NOT NULL,
    country VARCHAR(128) NOT NULL,
    region VARCHAR(255) NOT NULL,
    max_draft_m NUMERIC(4, 2) NOT NULL,
    max_loa_m NUMERIC(5, 1) NOT NULL,
    max_beam_m NUMERIC(4, 1) NOT NULL,
    handling_rate_mt_per_day INTEGER NOT NULL,
    berths_count INTEGER NOT NULL DEFAULT 6,
    tide_restriction BOOLEAN DEFAULT FALSE,
    is_origin BOOLEAN DEFAULT FALSE,
    is_destination BOOLEAN DEFAULT FALSE,
    notes TEXT,
    lat NUMERIC(8, 4),
    lng NUMERIC(8, 4),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vessel_classes (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    dwt_min INTEGER NOT NULL,
    dwt_max INTEGER NOT NULL,
    draft_min_m NUMERIC(4, 2) NOT NULL,
    draft_max_m NUMERIC(4, 2) NOT NULL,
    loa_min_m NUMERIC(5, 1) NOT NULL,
    loa_max_m NUMERIC(5, 1) NOT NULL,
    beam_min_m NUMERIC(4, 1) NOT NULL,
    beam_max_m NUMERIC(4, 1) NOT NULL,
    typical_speed_knots NUMERIC(4, 1) DEFAULT 13.5,
    fuel_consumption_tonnes_day NUMERIC(4, 1) DEFAULT 24.0,
    daily_hire_base_usd NUMERIC(10, 2) DEFAULT 14000.0,
    typical_cargo TEXT[],
    description TEXT
);

CREATE TABLE IF NOT EXISTS freight_rates_history (
    id BIGSERIAL PRIMARY KEY,
    origin_port_id VARCHAR(64) REFERENCES ports(id),
    destination_port_id VARCHAR(64) REFERENCES ports(id),
    vessel_class_id VARCHAR(64) REFERENCES vessel_classes(id),
    date DATE NOT NULL,
    rate_usd_per_tonne NUMERIC(6, 2) NOT NULL,
    bunker_price_usd NUMERIC(7, 2) NOT NULL,
    commodity_price_usd NUMERIC(8, 2),
    congestion_index NUMERIC(3, 2) NOT NULL DEFAULT 0.35,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_route_vessel_date UNIQUE (origin_port_id, destination_port_id, vessel_class_id, date)
);

CREATE TABLE IF NOT EXISTS forecast_requests (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id),
    cargo_type VARCHAR(128) NOT NULL,
    cargo_volume_mt INTEGER NOT NULL,
    origin_port_id VARCHAR(64) REFERENCES ports(id),
    destination_port_id VARCHAR(64) REFERENCES ports(id),
    duration_type VARCHAR(32) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS forecast_results (
    id VARCHAR(64) PRIMARY KEY,
    forecast_request_id VARCHAR(64) REFERENCES forecast_requests(id) ON DELETE CASCADE,
    recommended_vessel_class_id VARCHAR(64) REFERENCES vessel_classes(id),
    current_spot_rate NUMERIC(6, 2) NOT NULL,
    lowest_predicted_rate NUMERIC(6, 2) NOT NULL,
    average_90_day_rate NUMERIC(6, 2) NOT NULL,
    recommended_entry_window_start DATE NOT NULL,
    recommended_entry_window_end DATE NOT NULL,
    predicted_rate_series_json JSONB NOT NULL,
    feasibility_matrix_json JSONB NOT NULL,
    risk_flags_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS risk_alerts (
    id VARCHAR(64) PRIMARY KEY,
    severity VARCHAR(16) NOT NULL, -- 'low', 'medium', 'high'
    category VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    port_id VARCHAR(64) REFERENCES ports(id),
    estimated_delay_days VARCHAR(32),
    cost_impact_usd_per_tonne NUMERIC(6, 2),
    mitigation_advice TEXT,
    reviewed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_freight_history_lookup ON freight_rates_history(origin_port_id, destination_port_id, date);
CREATE INDEX IF NOT EXISTS idx_forecast_requests_user ON forecast_requests(user_id, created_at DESC);
