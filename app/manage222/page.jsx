"use client";
import { Typography, Input } from "@mui/material";
import Papa from "papaparse";
import axios from "axios";
import { useEffect, useState } from "react";
import commonConfig from "@/app/assets/csvHeaderTest";

export default function Manage() {
  const [src, setSrc] = useState("");
  const [CsvData, setCsvData] = useState([{}]);

  function parseCSVData() {
    Papa.parse(`${src}`, {
      ...commonConfig,
      header: true,
      download: true,
      complete: (result) => {
        console.log(result.data);
        setCsvData(result.data);
      },
    });
  }

  useEffect(() => {
    parseCSVData();
  }, [src]);

  return (
    <>
      <h3>csv파일 선택하기 test</h3>
      <Input
        color="primary"
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
          //console.log(result);
          if (result.ok) {
            setSrc(result.url + "/iracing/" + filename);
          } else {
            console.log("ERROR....");
          }
        }}
      />
      {src === "" ? null : (
        <>
          <h3>csv파일 읽어온 값</h3>
          {CsvData.map((data, index) => (
            <Typography key={index}>
              {data.FinPos}. {data.Name}({data.CustID})
            </Typography>
          ))}
        </>
      )}
    </>
  );
}
