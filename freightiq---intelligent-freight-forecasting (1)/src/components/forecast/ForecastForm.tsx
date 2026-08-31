import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  Info,
  AlertCircle,
  Anchor,
  Calendar,
  Layers,
  Sparkles
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
    <div id="new-forecast-container" className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      {/* Top Banner / Workspace Preset Header */}
      <div className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12A6A6]" />
            <h2 className="text-[16px] sm:text-[18px] font-bold text-white uppercase tracking-wider">
              CREATE FREIGHT FORECAST
            </h2>
          </div>
          <p className="text-[13px] text-slate-400 mt-1">
            Configure cargo volume, maritime trading corridor, and target laycan window for econometric prediction.
          </p>
        </div>

        <button
          type="button"
          id="btn-load-demo-preset"
          onClick={handleLoadDemoPreset}
          className="px-4 py-2 rounded-[6px] bg-[#102A43] hover:bg-[#153655] border border-[#183A52] text-[#12A6A6] text-[13px] font-semibold transition cursor-pointer self-start md:self-auto flex items-center gap-2 shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-[#12A6A6]" />
          <span>Load Australia → Paradip Preset</span>
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* SECTION 1: CARGO SPECIFICATION */}
        <div id="form-section-cargo" className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm">
          <div className="pb-3.5 border-b border-[#183A52] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#102337] text-[#12A6A6] flex items-center justify-center font-bold text-[12px] border border-[#183A52]">
                01
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">
                  Cargo Specification
                </h3>
                <p className="text-[12px] text-slate-400">Material classification and parcel weight</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            {/* Cargo Type */}
            <div>
              <label htmlFor="cargoType" className="block text-[12.5px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Cargo Type <span className="text-[#E05252]">*</span>
              </label>
              <select
                id="cargoType"
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value as CargoType)}
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-[13.5px] font-medium text-white focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6] focus:border-[#12A6A6] transition"
              >
                {CARGO_TYPES.map(type => (
                  <option key={type} value={type} className="bg-[#071522] text-white">
                    {type}
                  </option>
                ))}
              </select>
              {errors.cargoType && (
                <p className="text-[12px] text-[#E05252] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.cargoType}
                </p>
              )}
            </div>

            {/* Cargo Volume */}
            <div>
              <label htmlFor="cargoVolumeMt" className="block text-[12.5px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Cargo Volume (Metric Tons) <span className="text-[#E05252]">*</span>
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
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-[13.5px] font-bold text-white font-mono focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6] focus:border-[#12A6A6] transition"
                />
                <span className="absolute right-3.5 top-2.5 text-[12.5px] text-slate-400 font-mono font-medium">
                  MT
                </span>
              </div>
              {errors.cargoVolumeMt && (
                <p className="text-[12px] text-[#E05252] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.cargoVolumeMt}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: MARITIME ROUTE & PORTS */}
        <div id="form-section-route" className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm">
          <div className="pb-3.5 border-b border-[#183A52] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#102337] text-[#12A6A6] flex items-center justify-center font-bold text-[12px] border border-[#183A52]">
                02
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">
                  Maritime Trade Route & Ports
                </h3>
                <p className="text-[12px] text-slate-400">
                  Select origin loading hub and Indian East Coast discharge port
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            {/* Origin */}
            <div>
              <label htmlFor="originId" className="block text-[12.5px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Origin Port (Loading Hub) <span className="text-[#E05252]">*</span>
              </label>
              <select
                id="originId"
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-[13.5px] font-medium text-white focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6] focus:border-[#12A6A6] transition"
              >
                {originPorts.map(port => (
                  <option key={port.id} value={port.id} className="bg-[#071522] text-white">
                    {port.name} ({port.region})
                  </option>
                ))}
              </select>
              {selectedOrigin && (
                <p className="text-[12px] text-slate-400 mt-2 font-mono">
                  Max Draft: <span className="text-slate-200 font-semibold">{selectedOrigin.maxDraftM}m</span> • Max LOA: <span className="text-slate-200 font-semibold">{selectedOrigin.maxLoaM}m</span>
                </p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destinationId" className="block text-[12.5px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Destination Port (East Coast India) <span className="text-[#E05252]">*</span>
              </label>
              <select
                id="destinationId"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-[13.5px] font-medium text-white focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6] focus:border-[#12A6A6] transition"
              >
                {destinationPorts.map(port => (
                  <option key={port.id} value={port.id} className="bg-[#071522] text-white">
                    {port.name} ({port.region.split(',')[0]})
                  </option>
                ))}
              </select>
              {selectedDest && (
                <p className="text-[12px] text-slate-400 mt-2 font-mono">
                  Max Draft: <span className="text-[#12A6A6] font-bold">{selectedDest.maxDraftM}m</span> • Max LOA: {selectedDest.maxLoaM}m • Beam: {selectedDest.maxBeamM}m
                </p>
              )}
            </div>
          </div>

          {selectedDest && (
            <div className="mt-4 p-3.5 rounded-[6px] bg-[#102337] border border-[#183A52] flex items-start gap-2.5 text-[12.5px] text-slate-300">
              <Info className="w-4 h-4 text-[#12A6A6] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">{selectedDest.name} Berthing Constraints: </span>
                {selectedDest.notes}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: CHARTER PERIOD & LAYCAN */}
        <div id="form-section-contract" className="bg-[#0D1B2A] rounded-[8px] border border-[#20384C] p-5 sm:p-6 shadow-sm">
          <div className="pb-3.5 border-b border-[#183A52] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#102337] text-[#12A6A6] flex items-center justify-center font-bold text-[12px] border border-[#183A52]">
                03
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-white uppercase tracking-wider">
                  Charter Period & Laycan Schedule
                </h3>
                <p className="text-[12px] text-slate-400">
                  Target duration scope and laycan opening/closing dates
                </p>
              </div>
            </div>
          </div>

          {/* Duration Scope Selection */}
          <div className="mt-4">
            <label className="block text-[12.5px] font-semibold text-slate-300 mb-2 uppercase tracking-wide">
              Duration Scope
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
              <button
                type="button"
                id="btn-duration-short"
                onClick={() => handleDurationChange('short')}
                className={`p-3.5 rounded-[6px] border text-left transition cursor-pointer ${
                  durationType === 'short'
                    ? 'border-[#12A6A6] bg-[#102A43] text-white shadow-xs'
                    : 'border-[#183A52] bg-[#071522] hover:bg-[#102337] text-slate-400'
                }`}
              >
                <div className="font-bold text-[13.5px] text-white">Short-Term (90 Days)</div>
                <div className="text-[12px] text-slate-400 mt-0.5">Spot fixture optimization</div>
              </button>

              <button
                type="button"
                id="btn-duration-medium"
                onClick={() => handleDurationChange('medium')}
                className={`p-3.5 rounded-[6px] border text-left transition cursor-pointer ${
                  durationType === 'medium'
                    ? 'border-[#12A6A6] bg-[#102A43] text-white shadow-xs'
                    : 'border-[#183A52] bg-[#071522] hover:bg-[#102337] text-slate-400'
                }`}
              >
                <div className="font-bold text-[13.5px] text-white">Medium-Term (180 Days)</div>
                <div className="text-[12px] text-slate-400 mt-0.5">Contract of affreightment (COA)</div>
              </button>
            </div>
          </div>

          {/* Start & End Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label htmlFor="startDate" className="block text-[12.5px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Start Date (Laycan Window Open) <span className="text-[#E05252]">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-[13.5px] font-medium text-white font-mono focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6] focus:border-[#12A6A6] transition"
              />
              {errors.startDate && (
                <p className="text-[12px] text-[#E05252] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.startDate}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-[12.5px] font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                End Date (Discharge Window Deadline) <span className="text-[#E05252]">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[6px] border border-[#183A52] bg-[#071522] text-[13.5px] font-medium text-white font-mono focus:outline-hidden focus:ring-1 focus:ring-[#12A6A6] focus:border-[#12A6A6] transition"
              />
              {errors.endDate && (
                <p className="text-[12px] text-[#E05252] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.endDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center gap-3 pt-2">
          <button
            type="submit"
            id="btn-generate-forecast-submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-[6px] bg-[#087F8C] hover:bg-[#0aa2b2] text-white text-[14px] font-bold transition flex items-center gap-2.5 cursor-pointer disabled:opacity-50 shadow-md uppercase tracking-wider"
          >
            <Compass className="w-4 h-4" />
            <span>GENERATE FORECAST</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
