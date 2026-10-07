'use client';

import React from 'react';
import { useStage } from '@/context/StageContext';
import { Sparkles, ChevronDown } from 'lucide-react';

export const StagePersistenceChip: React.FC = () => {
  const { stage, week, stageInfo, openSelector } = useStage();

  if (!stage || !stageInfo) {
    return (
      <button
        onClick={openSelector}
        className="inline-flex items-center gap-1.5 rounded-full border border-cream-300 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-charcoal-800 transition-all hover:bg-cream-100 hover:border-earth-green-700 shadow-peak-sm active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5 text-sage-600" />
        <span>Select Stage</span>
        <ChevronDown className="w-3 h-3 text-charcoal-400 ml-0.5" />
      </button>
    );
  }

  return (
    <button
      onClick={openSelector}
      className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-white px-3.5 py-1.5 text-xs font-medium text-charcoal-800 transition-all hover:border-earth-green-700 shadow-peak-sm active:scale-95"
    >
      <div className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
      <span className="text-charcoal-500 font-normal">Showing:</span>
      <span className="font-bold text-earth-green-800">
        {stageInfo.title}
        {week && ` · Wk ${week}`}
      </span>
      <span className="text-[11px] text-charcoal-400 font-normal underline hover:text-earth-green-800 ml-0.5">
        Change
      </span>
    </button>
  );
};
