import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import * as API from '../services/api';
import { timeout } from '../helpers';
import ProductCard from '../components/ProductCard';

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        setLoading(true);
        setErrorMsg('');

        const fetchPromise = API.getProducts();
        const res = await Promise.race([fetchPromise, timeout(4)]);
        const data = await res;

        if (!data?.length) {
          throw new Error('Нет товаров');
        }

        setProducts(data);
        setErrorMsg('');
      } catch (e) {
        setProducts([]);
        setErrorMsg(e.message);
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsList();
  }, []);

  return (
    <>
      {!errorMsg && (
        <>
          {loading && <CircularProgress />}
          {!loading && (
            <Grid container spacing={4} justifyContent="center" width="100%">
              {products?.map((product) => (
                <Grid item key={product.id}>
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ProductCard product={product} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
    </>
  );
}
