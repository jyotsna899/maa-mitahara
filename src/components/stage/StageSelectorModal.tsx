'use client';

import React, { useState } from 'react';
import { useStage } from '@/context/StageContext';
import { STAGE_LIST } from '@/data/stages';
import { StageKey } from '@/types';
import { X, Check, Calendar, ArrowRight } from 'lucide-react';

export const StageSelectorModal: React.FC = () => {
  const { stage, week, isSelectorOpen, setStage, clearStage, closeSelector } = useStage();
  const [selectedStage, setSelectedStage] = useState<StageKey | null>(stage);
  const [customWeek, setCustomWeek] = useState<string>(week ? week.toString() : '');

  if (!isSelectorOpen) return null;

  const handleApply = () => {
    if (selectedStage) {
      const parsedWeek = customWeek ? parseInt(customWeek, 10) : undefined;
      setStage(selectedStage, isNaN(parsedWeek || 0) ? undefined : parsedWeek);
    } else {
      clearStage();
    }
    closeSelector();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-charcoal-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-t-peak-xl sm:rounded-peak-xl border border-cream-200 bg-ivory-50 p-6 shadow-peak-float max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cream-200">
          <div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Personalise for Your Gestational Stage
            </h3>
            <p className="text-xs text-charcoal-500 mt-0.5">
              Select your current window to view doctor-reviewed recommendations.
            </p>
          </div>
          <button
            onClick={closeSelector}
            className="rounded-full p-2 text-charcoal-400 hover:text-charcoal-900 hover:bg-cream-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage List Options */}
        <div className="mt-5 space-y-2.5">
          {STAGE_LIST.map((item) => {
            const isSelected = selectedStage === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSelectedStage(item.key)}
                className={`w-full flex items-center justify-between rounded-peak p-3.5 text-left border transition-all ${
                  isSelected
                    ? 'border-earth-green-800 bg-white shadow-peak-sm ring-1 ring-earth-green-800'
                    : 'border-cream-200 bg-white/70 hover:bg-white hover:border-cream-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-charcoal-900 text-sm">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-semibold text-earth-green-800 bg-earth-green-50 border border-earth-green-200 px-2 py-0.5 rounded-full">
                      {item.weekRange}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-500 mt-1 line-clamp-1">
                    {item.shortDescription}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                    isSelected
                      ? 'border-earth-green-800 bg-earth-green-800 text-white'
                      : 'border-cream-300 bg-cream-50'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Optional Week Number input if pregnant */}
        {selectedStage && selectedStage !== 'trying_to_conceive' && selectedStage !== 'postpartum' && (
          <div className="mt-4 p-3.5 rounded-peak bg-cream-100/70 border border-cream-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-charcoal-700 font-medium">
              <Calendar className="w-4 h-4 text-earth-green-800 shrink-0" />
              <span>Exact Pregnancy Week (Optional):</span>
            </div>
            <input
              type="number"
              min="1"
              max="42"
              placeholder="e.g. 18"
              value={customWeek}
              onChange={(e) => setCustomWeek(e.target.value)}
              className="w-20 rounded-peak border border-cream-300 bg-white px-2.5 py-1 text-center text-xs font-semibold text-charcoal-900 focus:border-earth-green-800 focus:outline-none focus:ring-1 focus:ring-earth-green-800"
            />
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between gap-3">
          {stage ? (
            <button
              type="button"
              onClick={() => {
                clearStage();
                setSelectedStage(null);
                setCustomWeek('');
                closeSelector();
              }}
              className="text-xs font-semibold text-charcoal-500 hover:text-red-700 transition-colors"
            >
              Reset to all stages
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeSelector}
              className="rounded-peak px-4 py-2 text-xs font-semibold text-charcoal-600 hover:bg-cream-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!selectedStage}
              className="inline-flex items-center gap-1.5 rounded-peak bg-earth-green-800 hover:bg-earth-green-900 disabled:opacity-50 px-5 py-2.5 text-xs font-semibold text-white shadow-peak-sm transition-all active:scale-95"
            >
              <span>Apply Stage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
