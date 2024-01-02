"use client";

import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AMX10_Top from "../admin/AMX10_Top";
import AMX10ResultSearch from "../admin/AMX10ResultSearch";
import { useRouter } from "next/navigation";

export default function AMX10() {
  const router = useRouter();
  return (
    <>
      <Typography
        variant="h5"
        sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}
      >
        <b>AMX 10</b>
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
      <AMX10_Top />
      <AMX10ResultSearch />
    </>
  );
}
