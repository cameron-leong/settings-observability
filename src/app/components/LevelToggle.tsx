import React, { useState } from 'react';

import {
  ToggleButtonGroup,
  ToggleButtonGroupItem,
} from '@dynatrace/strato-components-preview/buttons';

export const LevelToggle = () => {
  const [value, setValue] = useState('left');

  return (
    <ToggleButtonGroup value={value} onChange={setValue}>
      <ToggleButtonGroupItem value="left">Environment</ToggleButtonGroupItem>
      <ToggleButtonGroupItem value="center">Host group</ToggleButtonGroupItem>
      <ToggleButtonGroupItem value="right">Individual</ToggleButtonGroupItem>
    </ToggleButtonGroup>
  );
};