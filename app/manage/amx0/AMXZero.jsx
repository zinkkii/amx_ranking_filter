"use client";

import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AMX0_Top from "../admin/AMX0_Top";
import AMX0ResultSearch from "../admin/AMX0ResultSearch";
import { useRouter } from "next/navigation";

export default function AMX0() {
  const router = useRouter();
  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}
      >
        <b>AMX Zero</b>
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          sx={{ border: "1px solid" }}
          onClick={() => router.push("/manage")}
        >
          DashBoard
        </LoadingButton>
      </Typography>
      <AMX0_Top />
      <AMX0ResultSearch />
    </>
  );
}
