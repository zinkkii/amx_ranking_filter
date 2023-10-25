"use client";
import { Container, Stack, Typography, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function Layout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Container sx={{ my: 5 }}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Kanit", fontWeight: "900" }}
          >
            AMX
          </Typography>
        </Container>

        <Container>
          <Stack
            direction={{
              md: "row",
            }}
            alignItems={{
              md: "flex-start",
            }}
            sx={{
              mb: {
                xs: 8,
                md: 10,
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                fontFamily: "Kanit",
              }}
            >
              {children}
            </Box>
          </Stack>
        </Container>
      </QueryClientProvider>
    </>
  );
}
