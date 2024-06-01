import { CombatData } from '@common/schema/combat';

export interface IPCCombat {
  read(filename: string, position?: number): Promise<CombatData[]>;
}
