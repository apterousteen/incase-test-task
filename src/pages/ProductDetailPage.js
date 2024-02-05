import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import * as API from '../services/api';
import { timeout } from '../helpers';
import ThumbnailCarousel from '../components/ThumbnailCarousel';
import ProductForm from '../components/ProductForm';

export default function ProductDetailPage({ onAddToCart, cart }) {
  const [product, setProduct] = useState({});
  const [currentColor, setCurrentColor] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const { id } = useParams();

  const handleColorChange = (event, newColorId) => {
    setCurrentColor(() => availableColors[newColorId - 1]);
    setCurrentSize(null);
  };

  const handleSizeChange = (newSize) => {
    setCurrentSize(newSize);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setErrorMsg('');

        const fetchPromise = API.getProduct(id);
        const res = await Promise.race([fetchPromise, timeout(4)]);
        const data = await res;

        if (!data) {
          throw new Error('Товар не найден');
        }

        setProduct(data);
        setErrorMsg('');
      } catch (e) {
        setProduct([]);
        setErrorMsg(e.message);
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        if (!Array.isArray(product?.colors)) {
          return;
        }

        const fetchPromises = product?.colors?.map((color) =>
          API.getProductColor(product.id, color.id)
        );

        const responses = await Promise.all(fetchPromises);

        setAvailableColors(responses);
      } catch (e) {
        setAvailableColors([]);
        console.error(e.message);
      }
    };

    fetchColors();
  }, [product]);

  useEffect(() => {
    const fetchAllSizes = async () => {
      try {
        const allSizes = await API.getSizes();

        const updatedSizes = allSizes.map((sizeObj) => ({
          ...sizeObj,
          available: currentColor?.sizes.some((size) => size === sizeObj.id),
        }));

        setAvailableSizes(updatedSizes);
      } catch (e) {
        console.error(e.message);
      }
    };

    fetchAllSizes();
  }, [currentColor]);

  useEffect(() => {
    setCurrentColor(availableColors?.at(0));
  }, [availableColors]);

  return (
    <Box
      className="product-detail-page"
      sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ThumbnailCarousel currentColor={currentColor} />
          <ProductForm
            product={product}
            availableColors={availableColors}
            availableSizes={availableSizes}
            currentColor={currentColor}
            currentSize={currentSize}
            cart={cart}
            onColorChange={handleColorChange}
            onSizeChange={handleSizeChange}
            onAddToCart={onAddToCart}
          />
        </>
      )}
    </Box>
  );
}
