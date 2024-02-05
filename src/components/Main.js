import { Box, Container } from "@mui/material";

export default function Main({ children }) {
  return (
    <Container component="main">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="calc(100vh - 64px)"
        pt={6}
        pb={6}
      >
        {children}
      </Box>
    </Container>
  );
}
