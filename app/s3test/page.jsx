"use client";

import Layout from "../layouts/layout";
import AWS from "aws-sdk";
import { useEffect, useState } from "react";

export default function Elovalue() {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;
  const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
  const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    console.log(fileExt);
    if (file.type !== "image/jpeg" || fileExt !== "jpg") {
      alert("jpg 파일만 Upload 가능합니다.");
      return;
    }
    setProgress(0);
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: "amxSeason3/" + file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setSelectedFile(null);
        }, 3000);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };
  return (
    <Layout>
      <h2>Elo</h2>
      <div>React S3 File Upload</div>
      {showAlert ? (
        <div>업로드 진행률 : {progress}%</div>
      ) : (
        <div>파일을 선택해 주세요.</div>
      )}
      <input type="file" onChange={handleFileInput} />
      {selectedFile ? (
        <button onClick={() => uploadFile(selectedFile)}>Upload</button>
      ) : null}
    </Layout>
  );
}
