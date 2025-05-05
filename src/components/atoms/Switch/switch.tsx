import { Switch, SwitchProps } from 'antd';
import * as React from 'react';

/**
 * A reusable switch component built with Ant Design's Switch.
 *
 * This component supports all properties defined in Ant Design's `SwitchProps`.
 * It can be used to toggle between two states, such as on/off or enabled/disabled.
 *
 * @param {SwitchProps} props - The properties passed to the Switch component.
 *
 * @returns {JSX.Element} A styled switch element for toggling states.
 */
const SwitchAtom: React.FC<SwitchProps> = ({ ...props }) => {
  return (
    <div className="switch-container">
      <Switch {...props} />
    </div>
  );
};

export default SwitchAtom;
