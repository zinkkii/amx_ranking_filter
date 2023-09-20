"use client";

import Image from "next/image";
import styles from "../page.module.css";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Test2() {
  const router = useRouter();
  return (
    <>
      <div className={styles.description}>
        <p>
          edit by &nbsp;
          <code className={styles.code}>app/test2/page.jsx</code>
        </p>
        <div style={{ cursor: "pointer" }}>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </div>
      </div>

      <div className={styles.filter}>
        <Container
          sx={{
            py: { xs: 5, md: 1 },
          }}
        >
          <h2>Excel In-Out Test</h2>
        </Container>
      </div>

      <div className={styles.grid}></div>
    </>
  );
}
