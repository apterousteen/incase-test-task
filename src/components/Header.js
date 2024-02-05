import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Badge, Box, Button, Toolbar } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export default function Header({ cart }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Link to={'/'}>
            <Button sx={{ color: '#e0e0e0' }}>Главная</Button>
          </Link>
          <Badge
            badgeContent={cart.length || null}
            color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Link to={`/cart`}>
              <Button
                sx={{ color: '#e0e0e0' }}
                startIcon={<ShoppingBagOutlinedIcon />}
              >
                Корзина
              </Button>
            </Link>
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
