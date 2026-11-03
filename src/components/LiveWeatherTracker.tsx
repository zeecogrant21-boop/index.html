/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Licensed Exclusively to Patricia Crosdale (Personal Use Only Prototype)
 */

import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Wind,
  Droplets,
  Gauge,
  Sun,
  RefreshCw,
  Compass,
  AlertTriangle,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import {
  JamaicaWeatherTracker,
  WeatherStationData,
  JAMAICA_WEATHER_STATIONS
} from '../utils/weatherService';

export const LiveWeatherTracker: React.FC = () => {
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [weatherData, setWeatherData] = useState<WeatherStationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadWeather = async (index: number) => {
    setIsLoading(true);
    const data = await JamaicaWeatherTracker.fetchStationWeather(index);
    setWeatherData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWeather(selectedStationIndex);
  }, [selectedStationIndex]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-wide">
                Live Jamaican Weather &amp; Environmental Telemetry
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 font-mono font-semibold uppercase">
                Active Tracking
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Microclimate observations across Jamaican parish observatories
            </p>
          </div>
        </div>

        <button
          onClick={() => loadWeather(selectedStationIndex)}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-teal-400' : 'text-slate-400'}`} />
          <span>Refresh Weather</span>
        </button>
      </div>

      {/* Parish Weather Station Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {JAMAICA_WEATHER_STATIONS.map((st, idx) => (
          <button
            key={st.stationName}
            onClick={() => setSelectedStationIndex(idx)}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedStationIndex === idx
                ? 'bg-teal-950/60 border-teal-400/80 shadow-md shadow-teal-950/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
              <span className="truncate">{st.parish}</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1 truncate">
              {st.stationName.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Main Weather Card */}
      {weatherData && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950/40 border border-teal-500/30 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold">
                {weatherData.stationName}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1">
                {weatherData.condition}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Coordinates: {weatherData.latitude}° N, {weatherData.longitude}° W • Last read: {weatherData.lastUpdated}
              </p>
            </div>

            <div className="flex items-baseline gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <div className="text-4xl font-extrabold font-mono text-teal-300">
                {weatherData.tempC}°C
              </div>
              <div className="text-xl font-mono text-slate-400">
                / {weatherData.tempF}°F
              </div>
            </div>
          </div>

          {/* Meteorological Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {/* Humidity */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Droplets className="w-4 h-4 text-sky-400" />
                <span>Relative Humidity</span>
              </div>
              <p className="text-xl font-mono font-bold text-white mt-2">
                {weatherData.humidity}%
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Tropical maritime air</p>
            </div>

            {/* Wind */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Wind className="w-4 h-4 text-teal-400" />
                <span>Trade Winds</span>
              </div>
              <p className="text-xl font-mono font-bold text-white mt-2">
                {weatherData.windSpeedKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Direction: {weatherData.windDirectionDeg}° (ENE)</p>
            </div>

            {/* UV Index */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Solar UV Index</span>
              </div>
              <p className="text-xl font-mono font-bold text-amber-400 mt-2">
                {weatherData.uvIndex} <span className="text-xs font-normal text-slate-400">/ 11+</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">High Caribbean Sun</p>
            </div>

            {/* Barometric Pressure */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Gauge className="w-4 h-4 text-indigo-400" />
                <span>Surface Pressure</span>
              </div>
              <p className="text-xl font-mono font-bold text-white mt-2">
                {weatherData.pressureHpa} <span className="text-xs font-normal text-slate-400">hPa</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Barometric stability</p>
            </div>
          </div>

          {/* Tropical Advisory Banner */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-emerald-300">Tropical Maritime Advisory: </span>
                <span className="text-slate-300">{weatherData.advisoryNote}</span>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-800/40 whitespace-nowrap">
              {weatherData.tropicalAdvisory}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
