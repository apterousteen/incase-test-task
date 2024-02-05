import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SizeSelect({ availableSizes, size, onSizeChange }) {
  return (
    <FormControl>
      <InputLabel id="size-select-label">Size</InputLabel>
      <Select
        name="size"
        labelId="size-select-label"
        id="size-select"
        label="Size"
        value={size ?? ''}
        onChange={(e) => onSizeChange(e.target.value)}
      >
        {availableSizes?.map((s) => (
          <MenuItem key={s.id} value={s.id} disabled={!s.available}>
            {`${s.label} / ${s.number}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
