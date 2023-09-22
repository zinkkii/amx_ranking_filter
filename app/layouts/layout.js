"use client";
import useResponsive from "../hooks/useResponsive";
import { Container, Stack, Typography, Button, Box } from "@mui/material";

export default function Layout({ children }) {
  const isMdUp = useResponsive("up", "md");

  return (
    <>
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
    </>
  );
}
