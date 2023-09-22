"use client";

import TopCategory from "../drivers/TopCategory";
import Layout from "../layouts/layout";
import Typography from "@mui/material/Typography";

export default function Countries() {
  return (
    <Layout>
      <TopCategory />
      <Typography
        variant="h5"
        sx={{ mb: 3, fontFamily: "Kanit", fontWeight: "900" }}
      >
        Countries
      </Typography>
    </Layout>
  );
}
