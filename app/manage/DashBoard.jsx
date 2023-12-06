"use client";
import { Typography, Stack, Divider } from "@mui/material";
import { signOut } from "next-auth/react";
import { LoadingButton } from "@mui/lab";
import AMX10 from "./admin/AMX10";
import AMX0 from "./admin/AMX0";
import AMX10_Top from "./admin/AMX10_Top";
import AMX10ResultSearch from "./admin/AMX10ResultSearch";

import useStore from "../store/test";
import { useEffect } from "react";

export default function DashBoard() {
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
        <Divider sx={{ marginTop: 5, marginBottom: 2, fontWeight: "900" }}>
          AMX_10
        </Divider>
        {/* <AMX10_Top />
        <AMX10ResultSearch /> */}
        <AMX10 />
        <Divider sx={{ marginTop: 5, marginBottom: 2, fontWeight: "900" }}>
          AMX_Zero
        </Divider>
        <AMX0 />
      </Stack>
    </>
  );
}
