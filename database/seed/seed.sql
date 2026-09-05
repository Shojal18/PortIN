-- ============================================================================
-- FreightIQ Database Seed Script - Smart India Hackathon 2026
-- ============================================================================

-- 1. Default Demo Manager User
-- Email: manager@freightiq.demo, Password: admin123 (bcrypt hash)
INSERT INTO users (id, email, password_hash, name, role, organization)
VALUES (
    'usr-demo-01',
    'manager@freightiq.demo',
    '$2a$10$8K1p/a0dL.5qU6l0/n555OuW3P0Qo5eX.23e59lTq0p0.4p7.Z77W',
    'Capt. Samarth R.',
    'Chief Logistics & Chartering Manager',
    'Bharat East Bulk Logistics Operations'
) ON CONFLICT (id) DO NOTHING;

-- 2. Reference Ports (Indian East Coast & Global Exporters)
INSERT INTO ports (id, name, code, country, region, max_draft_m, max_loa_m, max_beam_m, handling_rate_mt_per_day, berths_count, tide_restriction, is_origin, is_destination, notes, lat, lng)
VALUES
('in-paradip', 'Paradip Port', 'INPRT', 'India', 'Odisha, East Coast', 14.5, 250.0, 40.0, 45000, 20, false, false, true, 'Major multi-cargo deepwater port. Capesize requires offshore lighterage due to 14.5m draft cap.', 20.2644, 86.6711),
('in-vizag', 'Visakhapatnam Port', 'INVTZ', 'India', 'Andhra Pradesh, East Coast', 18.1, 280.0, 45.0, 55000, 24, false, false, true, 'Premier major port on East Coast. Outer harbor can accommodate Capesize vessels up to 200,000 DWT.', 17.6868, 83.2185),
('in-gangavaram', 'Gangavaram Port', 'INGVP', 'India', 'Andhra Pradesh, East Coast', 18.5, 300.0, 50.0, 60000, 9, false, false, true, 'All-weather deep water multi-purpose port capable of handling Capesize vessels directly.', 17.6167, 83.2333),
('in-gopalpur', 'Gopalpur Port', 'INGPR', 'India', 'Odisha, East Coast', 13.0, 225.0, 33.0, 30000, 6, false, false, true, 'Accommodates Handysize and Supramax, limited Panamax on draft restrictions.', 19.3083, 84.9667),
('in-dhamra', 'Dhamra Port', 'INDHR', 'India', 'Odisha, East Coast', 18.0, 300.0, 48.0, 65000, 8, false, false, true, 'Deep draught bulk terminal directly accommodating fully loaded Capesize bulk carriers.', 20.8258, 86.9742),
('in-sagar', 'Sagar–Sandheads Anchorage', 'INSAG', 'India', 'West Bengal, Hooghly Estuary', 11.5, 210.0, 32.5, 25000, 4, true, false, true, 'Anchorage lighterage point for Kolkata/Haldia complex. Tidal scheduling mandatory.', 21.6500, 88.0500),
('in-haldia', 'Haldia Dock Complex', 'INHAL', 'India', 'West Bengal, Riverine Port', 8.5, 190.0, 31.0, 22000, 14, true, false, true, 'Riverine draft ceiling (8.5m). Heavy draught vessels must lighter at Sandheads.', 22.0222, 88.0644),
('au-haypoint', 'Australia (Hay Point / Dalrymple Bay)', 'AUHPT', 'Australia', 'Queensland, Coral Sea', 20.0, 330.0, 55.0, 120000, 7, false, true, false, 'Major coal and mineral export corridor to India.', -21.2833, 149.3000),
('us-neworleans', 'United States (New Orleans / Mississippi)', 'USMSX', 'United States', 'Gulf of Mexico / Mississippi River', 15.2, 275.0, 45.0, 75000, 12, false, true, false, 'Agricultural grain and high-grade metallurgical coal exporting hub.', 29.9511, -90.0715),
('mz-maputo', 'Mozambique (Maputo / Matola Coal Terminal)', 'MZMPT', 'Mozambique', 'Southern Africa, Indian Ocean', 14.5, 260.0, 42.0, 40000, 5, false, true, false, 'Key South/East African export gate for steam coal and chrome ore.', -25.9692, 32.5732),
('ru-novorossiysk', 'Russia (Novorossiysk / Black Sea)', 'RUNVS', 'Russia', 'Black Sea', 14.0, 250.0, 40.0, 50000, 10, false, true, false, 'Fertilizer, grain, and steam coal bound for Asia.', 44.7239, 37.7686),
('id-taboneo', 'Indonesia (Taboneo Anchorage / South Kalimantan)', 'IDTBN', 'Indonesia', 'Java Sea / Kalimantan', 18.0, 300.0, 48.0, 60000, 15, false, true, false, 'Prime anchorage hub for Indonesian sub-bituminous thermal coal.', -3.7333, 114.4667)
ON CONFLICT (id) DO NOTHING;

-- 3. Reference Vessel Classes
INSERT INTO vessel_classes (id, name, dwt_min, dwt_max, draft_min_m, draft_max_m, loa_min_m, loa_max_m, beam_min_m, beam_max_m, typical_speed_knots, fuel_consumption_tonnes_day, daily_hire_base_usd, typical_cargo, description)
VALUES
('vessel-handysize', 'Handysize', 30000, 40000, 10.0, 10.8, 170.0, 185.0, 27.0, 28.5, 13.0, 19.5, 11500.0, ARRAY['Fertilizer', 'Grain', 'Bauxite', 'Coal – Thermal', 'Other Bulk Cargo'], 'Geared bulk carrier with onboard cranes. Capable of accessing shallow riverine ports like Haldia.'),
('vessel-supramax', 'Supramax', 50000, 64000, 12.2, 13.0, 190.0, 200.0, 32.2, 32.3, 13.5, 24.0, 14200.0, ARRAY['Coal – Thermal', 'Coal – Coking', 'Iron Ore', 'Grain', 'Fertilizer', 'Bauxite'], 'Workhorse of modern dry bulk shipping with 4x30t cranes. Optimal fit for Paradip, Gopalpur, Vizag.'),
('vessel-panamax', 'Panamax', 65000, 82000, 13.8, 14.8, 225.0, 229.0, 32.26, 32.3, 14.0, 28.5, 16800.0, ARRAY['Coal – Thermal', 'Coal – Coking', 'Iron Ore', 'Grain', 'Bauxite'], 'Gearless or geared dry bulk carrier optimized for high-volume coal/mineral routes where draft allows.'),
('vessel-capesize', 'Capesize', 110000, 180000, 16.5, 18.5, 280.0, 300.0, 45.0, 47.0, 14.5, 42.0, 22500.0, ARRAY['Iron Ore', 'Coal – Thermal', 'Coal – Coking', 'Bauxite'], 'Ultra-large bulk carrier delivering maximum freight volume economics. Requires ultra-deepwater berths or offshore lighterage.')
ON CONFLICT (id) DO NOTHING;

-- 4. Initial Risk Alerts
INSERT INTO risk_alerts (id, severity, category, title, description, port_id, estimated_delay_days, cost_impact_usd_per_tonne, mitigationAdvice, reviewed)
VALUES
('alert-01', 'medium', 'congestion', 'Elevated Berth Congestion at Paradip Port', 'Mechanized Coal Berth (MCB) pre-berthing waiting time has risen to 3.4 days due to heavy coastal thermal coal evacuation.', 'in-paradip', '2–4 days', 0.85, 'Fix charter laycan outside peak coal evacuation weeks or arrange priority discharge guarantee in charter party.', false),
('alert-02', 'high', 'weather', 'Southwest Monsoon Sea Swell & Wave Height Alert', 'Monsoonal wind surges across the Bay of Bengal are creating 3.5m–4.2m wave swells affecting Haldia approach & Sagar anchorage lighterage operations.', 'in-sagar', '3–6 days', 1.40, 'Divert direct discharging shipments to deepwater sheltered berths at Dhamra or Gangavaram to prevent double handling costs.', false),
('alert-03', 'low', 'volatility', 'Global VLSFO Bunker Price Stabilizing', 'Singapore & Fujairah VLSFO 0.5% fuel benchmarks decreased 3.2% over the last 14 days, lowering expected bunker adjustment factors.', NULL, 'None', -0.30, 'Lock bunker rate clauses on indexed Platts terms for voyages scheduled in Q4.', true),
('alert-04', 'medium', 'volatility', 'Cape / Panamax Freight Volatility Widening', 'Atlantic and Pacific basin capesize paper FFA curves show increased volatility spread (+/- $2.40/MT) over 60-90 day forward positions.', NULL, '1–2 days', 0.60, 'Utilize Supramax or fixed time-charter index hedging rather than open spot Capesize exposure for critical shipments.', false)
ON CONFLICT (id) DO NOTHING;
