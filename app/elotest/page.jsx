"use client";

import Image from "next/image";
import styles from "../page.module.css";
import EloTable from "./EloTable";

export default function Page() {
  return (
    <>
      <div className={styles.description}>
        <p>
          edit by &nbsp;
          <code className={styles.code}>app/elotest/page.jsx</code>
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
        <h2>Elo Test</h2>
        <br />
        <br />

        <EloTable />
      </div>
    </>
  );
}
