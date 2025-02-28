import React, { useState } from 'react';

import {
  ToggleButtonGroup,
  ToggleButtonGroupItem,
} from '@dynatrace/strato-components-preview/buttons';



export const LevelToggle = ({toggleGroups}) => {
  const [value, setValue] = useState('left');

  return (
    <ToggleButtonGroup value={value} onChange={setValue}>
      { toggleGroups.map((group, index) => (
        <ToggleButtonGroupItem key={index} value={group.position}>
          {group.label}
        </ToggleButtonGroupItem>
      ))}
    </ToggleButtonGroup>
  );
};