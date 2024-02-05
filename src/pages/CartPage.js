import { Button, Grid, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';
import BackButton from '../components/BackButton';

export default function CartPage({ cart, setCart }) {
  return (
    <>
      <BackButton />
      <Grid container spacing={4} justifyContent="center" width="100%">
        {cart.length ? (
          cart.map((product) => (
            <Grid item key={product.id}>
              <ProductCard product={product}>
                <span style={{ display: 'block' }}>цвет: {product.color}</span>
                <span style={{ display: 'block' }}>размер: {product.size}</span>
                <span style={{ display: 'block' }}>цена: {product.price}</span>
                <Button
                  sx={{ mb: 1, float: 'right' }}
                  color="error"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCart((c) => c.filter((i) => i.id !== product.id));
                  }}
                >
                  Удалить
                </Button>
              </ProductCard>
            </Grid>
          ))
        ) : (
          <Typography variant="h5">Корзина пустая</Typography>
        )}
      </Grid>
    </>
  );
}
