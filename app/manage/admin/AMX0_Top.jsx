"use client";
import { Box, Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AMX0_Top() {
  const router = useRouter();
  return (
    <Box
      gap={1}
      display="grid"
      sx={{ mb: 3 }}
      gridTemplateColumns={{
        xs: "repeat(4, 1fr)",
        sm: "repeat(4, 1fr)",
        md: "repeat(4, 1fr)",
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
            router.push("/manage/amx0/q");
          }}
        >
          Q update
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
            router.push("/manage/amx0/h1");
          }}
        >
          H1 update
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
            router.push("/manage/amx0/h2");
          }}
        >
          H2 update
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
            router.push("/manage/amx0/checkzoom");
          }}
        >
          Zoom Check
        </Button>
      </Stack>
    </Box>
  );
}
