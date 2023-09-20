import Image from "next/image";
import styles from "../page.module.css";
import { Container } from "@mui/material";
import JsonData from "./JsonData";
const xlsx = require("xlsx");

export default function filter() {
  const workbook = xlsx.readFile("public/data/iracingData.xlsx");
  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];

  const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);

  //console.log(firstSheetJson.slice(0, 100));
  const data100 = firstSheetJson.slice(0, 100);

  return (
    <>
      <div className={styles.description}>
        <p>
          edit by &nbsp;
          <code className={styles.code}>app/test/page.jsx</code>
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
          <JsonData data={data100} />
        </Container>
      </div>

      <div className={styles.grid}></div>
    </>
  );
}
