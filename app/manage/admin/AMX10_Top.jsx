"use client";
import { Typography, Box, Stack, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AMX10_Top() {
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
            router.push("/manage/amx10/q");
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
            router.push("/manage/amx10/h1");
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
            router.push("/manage/amx10/h2");
          }}
        >
          H2 update
        </Button>
      </Stack>
    </Box>
  );
}
