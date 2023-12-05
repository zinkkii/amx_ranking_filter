"use client";

import {
  Stack,
  Button,
  Box,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function LeaderBoardTopCategory() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
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
            className={
              pathname == "/leaderboard/amx10" ? "clickedBtn" : "normalBtn"
            }
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/leaderboard/amx10");
            }}
          >
            AMX 10
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
            className={
              pathname == "/leaderboard/amxzero" ? "clickedBtn" : "normalBtn"
            }
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/leaderboard/amxzero");
            }}
          >
            AMX Zero
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
            className={
              pathname == "/leaderboard/totalearnings"
                ? "clickedBtn"
                : "normalBtn"
            }
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/leaderboard/totalearnings");
            }}
          >
            Total Earnings
          </Button>
        </Stack>
      </Box>
    </>
  );
}
