"use client";
import Link from "next/link";
import { ThemeProvider } from "@mui/system";
import theme from "../assets/theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, Stack, Typography, Box } from "@mui/material";

const queryClient = new QueryClient();

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{ my: 5, display: "flex", justifyContent: "space-between" }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Kanit", fontWeight: "900" }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            AMX ELO
          </Link>
        </Typography>
        <Typography
          variant="h6"
          sx={{ my: 1, fontFamily: "Kanit", fontWeight: "900" }}
        >
          <Link href="/leaderboard/amx10" style={{ textDecoration: "none" }}>
            AMX Global S3 LeaderBoard
          </Link>
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
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
