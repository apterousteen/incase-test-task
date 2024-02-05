import React, { useState } from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

export default function ThumbnailCarousel({ currentColor }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = currentColor?.images;

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images?.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images?.length) % images?.length
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        maxHeight: '350px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
          height: '100%',
        }}
      >
        {images?.map((image, index) => (
          <Button key={index} onClick={() => setCurrentImageIndex(index)}>
            <img
              style={{ width: '54px' }}
              src={images?.at(index)}
              alt="thumbnail"
            />
          </Button>
        ))}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handlePrev}>
          <ArrowBackIos />
        </IconButton>
        <img
          src={images?.at(currentImageIndex)}
          style={{ maxHeight: '350px' }}
          alt="current-img"
        />
        <IconButton onClick={handleNext}>
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
}
