import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Info,
  AlertCircle
} from 'lucide-react';
import { CargoType, DurationType, ForecastRequestInput } from '../../types';
import { REFERENCE_PORTS } from '../../data/referenceData';
import { useToast } from '../layout/Toast';

interface ForecastFormProps {
  onSubmit: (input: ForecastRequestInput) => Promise<void>;
  isLoading: boolean;
}

const CARGO_TYPES: CargoType[] = [
  'Coal – Thermal',
  'Coal – Coking',
  'Iron Ore',
  'Grain',
  'Fertilizer',
  'Bauxite',
  'Other Bulk Cargo'
];

export const ForecastForm: React.FC<ForecastFormProps> = ({ onSubmit, isLoading }) => {
  const { showToast } = useToast();

  const [cargoType, setCargoType] = useState<CargoType>('Coal – Thermal');
  const [cargoVolumeMt, setCargoVolumeMt] = useState<number>(120000);
  const [originId, setOriginId] = useState<string>('au-haypoint');
  const [destinationId, setDestinationId] = useState<string>('in-paradip');
  const [durationType, setDurationType] = useState<DurationType>('short');

  const today = new Date();
  const defaultStart = new Date(today.getTime() + 7 * 86400000).toISOString().split('T')[0];
  const defaultEnd = new Date(today.getTime() + 97 * 86400000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(defaultStart);
  const [endDate, setEndDate] = useState<string>(defaultEnd);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const originPorts = REFERENCE_PORTS.filter(p => p.isOrigin);
  const destinationPorts = REFERENCE_PORTS.filter(p => p.isDestination);

  const selectedOrigin = REFERENCE_PORTS.find(p => p.id === originId);
  const selectedDest = REFERENCE_PORTS.find(p => p.id === destinationId);

  const handleLoadDemoPreset = () => {
    setCargoType('Coal – Thermal');
    setCargoVolumeMt(120000);
    setOriginId('au-haypoint');
    setDestinationId('in-paradip');
    setDurationType('short');
    setStartDate('2026-09-01');
    setEndDate('2026-11-30');
    setErrors({});
    showToast('info', 'Demo Preset Loaded', 'Configured 120,000 MT Thermal Coal from Australia (Hay Point) to Paradip Port.');
  };

  const handleDurationChange = (type: DurationType) => {
    setDurationType(type);
    const start = new Date(startDate || today);
    const daysToAdd = type === 'short' ? 90 : 180;
    const newEnd = new Date(start.getTime() + daysToAdd * 86400000).toISOString().split('T')[0];
    setEndDate(newEnd);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!cargoType) errs.cargoType = 'Cargo type is required.';
    if (!cargoVolumeMt || cargoVolumeMt < 1000) {
      errs.cargoVolumeMt = 'Minimum volume must be at least 1,000 MT.';
    } else if (cargoVolumeMt > 1000000) {
      errs.cargoVolumeMt = 'Volume exceeds maximum single charter limit of 1,000,000 MT.';
    }

    if (!originId) errs.originId = 'Origin port is required.';
    if (!destinationId) errs.destinationId = 'Destination Indian port is required.';

    if (!startDate) errs.startDate = 'Charter start date is required.';
    if (!endDate) errs.endDate = 'Charter end date is required.';
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      errs.endDate = 'End date must be strictly after the start date.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('error', 'Form Validation Error', 'Please check highlighted fields before submitting.');
      return;
    }

    const input: ForecastRequestInput = {
      cargoType,
      cargoVolumeMt: Number(cargoVolumeMt),
      originId,
      destinationId,
      durationType,
      startDate,
      endDate,
      forecastHorizonDays: durationType === 'short' ? 90 : 180
    };

    await onSubmit(input);
  };

  return (
    <div id="new-forecast-container" className="w-full max-w-4xl mx-auto space-y-5 font-sans">
      {/* Top Banner / Preset Header */}
      <div className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] sm:text-[16px] font-semibold text-black uppercase tracking-wider">
            Create Freight Forecast
          </h2>
          <p className="text-[12.5px] text-gray-600 mt-0.5">
            Configure cargo volume, maritime trading corridor, and target laycan window for econometric prediction.
          </p>
        </div>

        <button
          type="button"
          id="btn-load-demo-preset"
          onClick={handleLoadDemoPreset}
          className="px-3 py-1.5 rounded-[4px] bg-white hover:bg-gray-50 border border-[#D0D0D0] text-gray-800 text-[12.5px] font-medium transition cursor-pointer self-start sm:self-auto shrink-0"
        >
          Load Australia → Paradip Preset
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SECTION 1: CARGO SPECIFICATION */}
        <div id="form-section-cargo" className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
          <div className="pb-3 border-b border-[#D0D0D0]">
            <h3 className="text-[13.5px] font-semibold text-black uppercase tracking-wider">
              1. Cargo Specification
            </h3>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Material classification and parcel weight
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5">
            {/* Cargo Type */}
            <div>
              <label htmlFor="cargoType" className="block text-[12px] font-medium text-gray-700 mb-1">
                Cargo Type *
              </label>
              <select
                id="cargoType"
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value as CargoType)}
                className="w-full px-3 py-2 rounded-[4px] border border-[#D0D0D0] bg-white text-[13px] text-gray-900 focus:outline-hidden focus:border-black transition"
              >
                {CARGO_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.cargoType && (
                <p className="text-[11.5px] text-black mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.cargoType}
                </p>
              )}
            </div>

            {/* Cargo Volume */}
            <div>
              <label htmlFor="cargoVolumeMt" className="block text-[12px] font-medium text-gray-700 mb-1">
                Cargo Volume (Metric Tons) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="cargoVolumeMt"
                  value={cargoVolumeMt}
                  step={5000}
                  min={1000}
                  max={1000000}
                  onChange={(e) => setCargoVolumeMt(Number(e.target.value))}
                  placeholder="e.g. 120000"
                  className="w-full px-3 py-2 rounded-[4px] border border-[#D0D0D0] bg-white text-[13px] font-mono text-gray-900 focus:outline-hidden focus:border-black transition"
                />
                <span className="absolute right-3 top-2 text-[12px] text-gray-500 font-mono">
                  MT
                </span>
              </div>
              {errors.cargoVolumeMt && (
                <p className="text-[11.5px] text-black mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.cargoVolumeMt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: MARITIME ROUTE & PORTS */}
        <div id="form-section-route" className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
          <div className="pb-3 border-b border-[#D0D0D0]">
            <h3 className="text-[13.5px] font-semibold text-black uppercase tracking-wider">
              2. Maritime Trade Route & Ports
            </h3>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Select origin loading hub and Indian East Coast discharge port
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5">
            {/* Origin */}
            <div>
              <label htmlFor="originId" className="block text-[12px] font-medium text-gray-700 mb-1">
                Origin Port (Loading Hub) *
              </label>
              <select
                id="originId"
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                className="w-full px-3 py-2 rounded-[4px] border border-[#D0D0D0] bg-white text-[13px] text-gray-900 focus:outline-hidden focus:border-black transition"
              >
                {originPorts.map(port => (
                  <option key={port.id} value={port.id}>
                    {port.name} ({port.region})
                  </option>
                ))}
              </select>
              {selectedOrigin && (
                <p className="text-[11.5px] text-gray-500 mt-1.5 font-mono">
                  Max Draft: <span className="text-gray-900 font-medium">{selectedOrigin.maxDraftM}m</span> • Max LOA: <span className="text-gray-900 font-medium">{selectedOrigin.maxLoaM}m</span>
                </p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destinationId" className="block text-[12px] font-medium text-gray-700 mb-1">
                Destination Port (East Coast India) *
              </label>
              <select
                id="destinationId"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full px-3 py-2 rounded-[4px] border border-[#D0D0D0] bg-white text-[13px] text-gray-900 focus:outline-hidden focus:border-black transition"
              >
                {destinationPorts.map(port => (
                  <option key={port.id} value={port.id}>
                    {port.name} ({port.region.split(',')[0]})
                  </option>
                ))}
              </select>
              {selectedDest && (
                <p className="text-[11.5px] text-gray-500 mt-1.5 font-mono">
                  Max Draft: <span className="text-gray-900 font-medium">{selectedDest.maxDraftM}m</span> • Max LOA: {selectedDest.maxLoaM}m • Beam: {selectedDest.maxBeamM}m
                </p>
              )}
            </div>
          </div>

          {selectedDest && (
            <div className="mt-3.5 p-3 rounded-[4px] bg-[#F9FAFB] border border-[#D0D0D0] flex items-start gap-2 text-[12px] text-gray-700">
              <Info className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-black">{selectedDest.name} Berthing Constraints: </span>
                {selectedDest.notes}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: CHARTER PERIOD & LAYCAN */}
        <div id="form-section-contract" className="bg-white rounded-[6px] border border-[#D0D0D0] p-4 sm:p-5">
          <div className="pb-3 border-b border-[#D0D0D0]">
            <h3 className="text-[13.5px] font-semibold text-black uppercase tracking-wider">
              3. Charter Period & Laycan Schedule
            </h3>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Target duration scope and laycan opening/closing dates
            </p>
          </div>

          {/* Duration Scope Selection */}
          <div className="mt-3.5">
            <label className="block text-[12px] font-medium text-gray-700 mb-1.5">
              Duration Scope
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                id="btn-duration-short"
                onClick={() => handleDurationChange('short')}
                className={`p-3 rounded-[4px] border text-left transition cursor-pointer ${
                  durationType === 'short'
                    ? 'border-black bg-black text-white'
                    : 'border-[#D0D0D0] bg-white hover:bg-gray-50 text-gray-800'
                }`}
              >
                <div className={`font-semibold text-[13px] ${durationType === 'short' ? 'text-white' : 'text-black'}`}>
                  Short-Term (90 Days)
                </div>
                <div className={`text-[11.5px] mt-0.5 ${durationType === 'short' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Spot fixture optimization
                </div>
              </button>

              <button
                type="button"
                id="btn-duration-medium"
                onClick={() => handleDurationChange('medium')}
                className={`p-3 rounded-[4px] border text-left transition cursor-pointer ${
                  durationType === 'medium'
                    ? 'border-black bg-black text-white'
                    : 'border-[#D0D0D0] bg-white hover:bg-gray-50 text-gray-800'
                }`}
              >
                <div className={`font-semibold text-[13px] ${durationType === 'medium' ? 'text-white' : 'text-black'}`}>
                  Medium-Term (180 Days)
                </div>
                <div className={`text-[11.5px] mt-0.5 ${durationType === 'medium' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Contract of affreightment (COA)
                </div>
              </button>
            </div>
          </div>

          {/* Start & End Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="startDate" className="block text-[12px] font-medium text-gray-700 mb-1">
                Start Date (Laycan Window Open) *
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-[4px] border border-[#D0D0D0] bg-white text-[13px] font-mono text-gray-900 focus:outline-hidden focus:border-black transition"
              />
              {errors.startDate && (
                <p className="text-[11.5px] text-black mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-[12px] font-medium text-gray-700 mb-1">
                End Date (Discharge Window Deadline) *
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-[4px] border border-[#D0D0D0] bg-white text-[13px] font-mono text-gray-900 focus:outline-hidden focus:border-black transition"
              />
              {errors.endDate && (
                <p className="text-[11.5px] text-black mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.endDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center gap-3 pt-2">
          <button
            type="submit"
            id="btn-generate-forecast-submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-[4px] bg-black hover:bg-[#262626] text-white text-[13px] font-medium transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Compass className="w-4 h-4" />
            <span>Generate Forecast</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
