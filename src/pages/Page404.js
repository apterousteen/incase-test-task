import { Container, Typography } from '@mui/material';

export default function Page404() {
  return (
    <Container
      sx={{
        m: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h5">
        <b>404</b> | Такой страницы нет
      </Typography>
    </Container>
  );
}
