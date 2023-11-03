"use client";

import { Typography } from "@mui/material";
import { useState } from "react";

export default function AMX10() {
  const [src, setSrc] = useState("");

  return (
    <>
      <Typography>AMX111111100000000000</Typography>
      <input
        type="file"
        accept="csv"
        onChange={async (e) => {
          let file = e.target.files[0];
          let filename = encodeURIComponent(file.name);
          let res = await fetch("/api/admin/upload?file=" + filename);
          res = await res.json();
          //S3 Upload
          const formData = new FormData();
          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          const result = await fetch(res.url, {
            method: "POST",
            body: formData,
          });
          console.log(result);
          if (result.ok) {
            setSrc(result.url + "/" + filename);
          } else {
            console.log("ERROR....");
          }
        }}
      />
      <img src={src} />
    </>
  );
}
