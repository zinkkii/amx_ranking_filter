"use client";

import { Stack, Button, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TopCategory() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, []);

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
          className={pathname == "/" ? "clickedBtn" : "normalBtn"}
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
          className={pathname == "/teams" ? "clickedBtn" : "normalBtn"}
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
          className={pathname == "/countries" ? "clickedBtn" : "normalBtn"}
          sx={{ width: "100%", height: "75px" }}
          variant="outlined"
          onClick={() => {
            router.push("/countries");
          }}
        >
          Countries
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
          className={pathname == "/r2_q" ? "clickedBtn" : "normalBtn"}
          sx={{ width: "100%", height: "75px" }}
          variant="outlined"
          onClick={() => {
            document.location.href = "/r2_q";
          }}
        >
          R2_Q
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
          className={pathname == "/r2_h1" ? "clickedBtn" : "normalBtn"}
          sx={{ width: "100%", height: "75px" }}
          variant="outlined"
          onClick={() => {
            document.location.href = "/r2_h1";
          }}
        >
          R2_H1
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
          className={pathname == "/r2_h2" ? "clickedBtn" : "normalBtn"}
          sx={{ width: "100%", height: "75px" }}
          variant="outlined"
          onClick={() => {
            document.location.href = "/r2_h2";
          }}
        >
          R2_H2
        </Button>
      </Stack>
    </Box>
  );
}
