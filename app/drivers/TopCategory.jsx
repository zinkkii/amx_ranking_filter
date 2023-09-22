"use client";

import { Stack, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function TopCategory() {
  const router = useRouter();
  return (
    <Box
      gap={1}
      display="grid"
      sx={{ mb: 3 }}
      gridTemplateColumns={{
        xs: "repeat(3, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          borderRadius: 2,
          cursor: "pointer",
        }}
      >
        <Button
          sx={{ width: "100%", height: "75px" }}
          variant="outlined"
          onClick={() => {
            router.push("/");
          }}
        >
          Drivers
        </Button>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          borderRadius: 2,
          cursor: "pointer",
        }}
      >
        <Button
          sx={{ width: "100%", height: "75px" }}
          variant="outlined"
          onClick={() => {
            router.push("/teams");
          }}
        >
          Teams
        </Button>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          borderRadius: 2,
          cursor: "pointer",
        }}
      >
        <Button
          sx={{ width: "100%", height: "75px" }}
          variant="outlined"
          onClick={() => {
            router.push("/countries");
          }}
        >
          Countries
        </Button>
      </Stack>
    </Box>
  );
}
