"use client";

import TopCategory from "../drivers/TopCategory";
import Typography from "@mui/material/Typography";

export default function Teams() {
  return (
    <>
      <TopCategory />

      <Typography
        variant="h5"
        sx={{ mb: 3, fontFamily: "Kanit", fontWeight: "900" }}
      >
        Teams
      </Typography>
    </>
  );
}
