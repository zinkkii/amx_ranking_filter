"use client";
import { Stack, Button, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Layout from "../layouts/layout";
export default function Amx0() {
  const router = useRouter();

  return (
    <Layout>
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
            // className={pathname == "/" ? "clickedBtn" : "normalBtn"}
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/amx0/q");
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
            // className={pathname == "/teams" ? "clickedBtn" : "normalBtn"}
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/amx0/h");
            }}
          >
            H1,2 update
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
            // className={pathname == "/teams" ? "clickedBtn" : "normalBtn"}
            sx={{ width: "100%", height: "75px" }}
            variant="outlined"
            onClick={() => {
              router.push("/amx0/zoom");
            }}
          >
            ZoomCam+Bonus
          </Button>
        </Stack>
      </Box>
    </Layout>
  );
}
