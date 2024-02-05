import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import ColorsButtonGroup from './ColorsButtonGroup';
import SizeSelect from './SizeSelect';

export default function ProductForm({
  product,
  availableColors,
  availableSizes,
  currentColor,
  currentSize,
  cart,
  onColorChange,
  onSizeChange,
  onAddToCart,
}) {
  const [isInCart, setIsInCart] = useState(false);
  const [cartItem, setCartItem] = useState({});

  useEffect(() => {
    if (!availableSizes || !product || !currentColor || !currentSize) {
      setIsInCart(false);
      return;
    }

    const { label, number } = availableSizes.find((s) => s.id === currentSize);
    const id = `${product.name}-${currentColor.name}-${label}`.toLowerCase();
    setIsInCart(() => cart?.some((i) => i.id === id));

    setCartItem({
      name: product.name,
      size: `${label} / ${number}`,
      color: currentColor.name,
      image: currentColor.images[0],
      price: currentColor.price,
      id,
    });
  }, [availableSizes, cart, currentColor, currentSize, product]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Typography variant="h5">{product?.name}</Typography>

      <ColorsButtonGroup
        availableColors={availableColors}
        currentColor={currentColor}
        onColorChange={onColorChange}
      />

      <SizeSelect
        availableSizes={availableSizes}
        size={currentSize}
        onSizeChange={onSizeChange}
      />

      {<Typography variant="h6">Цена: {currentColor?.price}</Typography>}

      {isInCart ? (
        <Link to={`/cart`}>
          <Button variant="contained" color="secondary">
            Перейти в корзину
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          disabled={!currentColor || !currentSize}
          onClick={() => cartItem && onAddToCart(cartItem)}
        >
          Добавить в корзину
        </Button>
      )}

      <Typography variant="body1">{currentColor?.description}</Typography>
    </Box>
  );
}
