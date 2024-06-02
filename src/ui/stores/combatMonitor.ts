import { create } from 'zustand';

import { CombatInfoLog } from '@common/types/logReader';

interface Part {
  lifeValue: number;
  accumulatedDamage: number;
}

interface CombatMonitorStore {
  inFight: boolean;

  fightStart: number;
  fightEnd: number;

  fightParts: Record<string, Part>;
  totalDamage: number;

  setFightStatus: (opts: { inFight: boolean; timestamp: number }) => void;
  appendPartLog: (log: CombatInfoLog) => void;

  fightDuration: () => number;
}

const useCombatMonitorStore = create<CombatMonitorStore>((set, get) => ({
  inFight: false,

  fightStart: -1,
  fightEnd: -1,

  fightParts: {},
  totalDamage: 0,

  setFightStatus: ({ inFight, timestamp }) => {
    if (inFight === true) {
      set({
        inFight,
        fightStart: timestamp,
        fightEnd: -1,
        fightParts: {},
        totalDamage: 0,
      });
    } else {
      set({ inFight, fightEnd: timestamp });
    }
  },

  appendPartLog: ({ data }) => {
    if (data.type !== 'Part') return;

    const uniqName = `${data.entity.id}:${data.entity.name}:${data.tagName}`;

    set(({ fightParts, totalDamage }) => {
      const { lifeValue, accumulatedDamage } = fightParts[uniqName] ?? {
        lifeValue: data.lifeValue,
        accumulatedDamage: 0,
      };

      const currentDamage = lifeValue - data.lifeValue;

      fightParts[uniqName] = {
        lifeValue,
        accumulatedDamage: accumulatedDamage + currentDamage,
      };

      return {
        totalDamage: totalDamage + currentDamage,
        fightParts: { ...fightParts },
      };
    });
  },

  fightDuration: () => {
    const { inFight, fightStart, fightEnd } = get();

    return ((inFight ? Date.now() : fightEnd) - fightStart) / 1000;
  },
}));

export default useCombatMonitorStore;