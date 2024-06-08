import CombatBuffs from './components/CombatBuffs';
import CombatStatus from './components/CombatStatus';
import useMonitor from './hooks/useMonitor';
import Card from '../Card';
import Vertical from '../Vertical';

import { combatMonitorStyle } from './index.css';

export default function CombatMonitor() {
  useMonitor();

  return (
    <Card>
      <Vertical className={combatMonitorStyle}>
        <CombatStatus />
        <CombatBuffs />
      </Vertical>
    </Card>
  );
}
