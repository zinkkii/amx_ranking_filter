"use client";
import { Stack, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Amx10() {
  const router = useRouter();
  return (
    <>
      <Box
        gap={1}
        display="grid"
        sx={{ mb: 3 }}
        gridTemplateColumns={{
          xs: "repeat(2, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
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
              router.push("/amx10/q");
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
              router.push("/amx10/h");
            }}
          >
            H1,2 update
          </Button>
        </Stack>
      </Box>
    </>
  );
}
