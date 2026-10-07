'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StageKey, NeedKey } from '@/types';
import { STAGES } from '@/data/stages';
import { analyticsService } from '@/services/mock/analyticsService';

interface StageState {
  stage: StageKey | null;
  week: number | null;
  dueDate: string | null;
  needs: NeedKey[];
  savedAt: number;
}

interface StageContextType {
  stage: StageKey | null;
  week: number | null;
  dueDate: string | null;
  needs: NeedKey[];
  stageInfo: typeof STAGES[string] | null;
  isSelectorOpen: boolean;
  setStage: (stage: StageKey, week?: number, dueDate?: string) => void;
  setNeeds: (needs: NeedKey[]) => void;
  clearStage: () => void;
  openSelector: () => void;
  closeSelector: () => void;
}

const STORAGE_KEY = 'mm_user_stage_state';
const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;

const StageContext = createContext<StageContextType | undefined>(undefined);

export function StageProvider({ children }: { children: React.ReactNode }) {
  const [stage, setStageState] = useState<StageKey | null>(null);
  const [week, setWeekState] = useState<number | null>(null);
  const [dueDate, setDueDateState] = useState<string | null>(null);
  const [needs, setNeedsState] = useState<NeedKey[]>([]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StageState = JSON.parse(stored);
        const isExpired = Date.now() - parsed.savedAt > NINETY_DAYS_MS;
        if (!isExpired && parsed.stage) {
          setStageState(parsed.stage);
          setWeekState(parsed.week);
          setDueDateState(parsed.dueDate);
          setNeedsState(parsed.needs || []);
        }
      }
    } catch (e) {
      console.warn('Could not read stage state from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const persistState = (newStage: StageKey | null, newWeek: number | null, newDue: string | null, newNeeds: NeedKey[]) => {
    if (typeof window === 'undefined') return;
    if (newStage) {
      const stateToSave: StageState = {
        stage: newStage,
        week: newWeek,
        dueDate: newDue,
        needs: newNeeds,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const setStage = (newStage: StageKey, newWeek?: number, newDue?: string) => {
    setStageState(newStage);
    const assignedWeek = newWeek !== undefined ? newWeek : null;
    const assignedDue = newDue || null;
    setWeekState(assignedWeek);
    setDueDateState(assignedDue);
    persistState(newStage, assignedWeek, assignedDue, needs);
    analyticsService.track('stage_selected', { stage: newStage, week: assignedWeek });
  };

  const setNeeds = (newNeeds: NeedKey[]) => {
    setNeedsState(newNeeds);
    persistState(stage, week, dueDate, newNeeds);
  };

  const clearStage = () => {
    setStageState(null);
    setWeekState(null);
    setDueDateState(null);
    setNeedsState([]);
    persistState(null, null, null, []);
  };

  const stageInfo = stage && STAGES[stage] ? STAGES[stage] : null;

  return (
    <StageContext.Provider
      value={{
        stage,
        week,
        dueDate,
        needs,
        stageInfo,
        isSelectorOpen,
        setStage,
        setNeeds,
        clearStage,
        openSelector: () => setIsSelectorOpen(true),
        closeSelector: () => setIsSelectorOpen(false),
      }}
    >
      {children}
    </StageContext.Provider>
  );
}

export function useStage() {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error('useStage must be used within a StageProvider');
  }
  return context;
}
