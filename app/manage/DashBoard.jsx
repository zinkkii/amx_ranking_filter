"use client";
import { Typography, Stack, Divider, Box, Button } from "@mui/material";
import { signOut } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";

export default function DashBoard(props) {
  const router = useRouter();
  const { session } = props;
  return (
    <>
      <Stack>
        <Typography
          variant="h5"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <b>Admin DashBoard</b>
          <LoadingButton
            color="error"
            size="large"
            type="submit"
            sx={{ border: "1px solid" }}
            onClick={() => signOut()}
          >
            <b>LOGOUT</b>
          </LoadingButton>
        </Typography>

        <Box
          gap={1}
          display="grid"
          sx={{ mb: 3, mt: 10 }}
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
              sx={{ width: "100%", height: "10vh" }}
              variant="outlined"
              onClick={() => {
                router.push("/manage/amx10");
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
              sx={{ width: "100%", height: "10vh" }}
              variant="outlined"
              onClick={() => {
                router.push("/manage/amx0");
              }}
            >
              AMX ZERO
            </Button>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
