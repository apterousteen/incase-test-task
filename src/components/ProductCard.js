import * as React from 'react';
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card,
} from '@mui/material';

export default function ProductCard({ product, children }) {
  return (
    <Card sx={{ maxWidth: 200, minWidth: 150 }}>
      <CardActionArea component="div">
        <CardMedia
          sx={{ width: 'fit-content', m: 'auto' }}
          component="img"
          height="140"
          image={product?.colors?.at(0).images[0] || product.image}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
