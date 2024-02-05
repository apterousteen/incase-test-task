import React from 'react';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Fab
      variant="extended"
      onClick={() => {
        navigate(-1);
      }}
    >
      Назад
    </Fab>
  );
}
