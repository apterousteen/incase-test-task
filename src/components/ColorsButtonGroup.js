import * as React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function ColorsButtonGroup({
  availableColors,
  currentColor,
  onColorChange,
}) {
  return (
    <ToggleButtonGroup
      name="color"
      value={currentColor?.id}
      exclusive
      onChange={onColorChange}
    >
      {availableColors?.map((c) => (
        <ToggleButton key={c.id} sx={{ minWidth: '70px' }} value={c.id}>
          {c.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
