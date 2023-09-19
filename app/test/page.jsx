"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../page.module.css";
import { Box, Container, Tabs, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

export default function filter() {
  const router = useRouter();
  const [value, setValue] = useState("1");
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Filtering Test&nbsp;
          <code className={styles.code}>app/test/page.jsx</code>
        </p>
        <div style={{ cursor: "pointer" }}>
          <Image
            onClick={() => router.push("/")}
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </div>
      </div>

      <Container
        sx={{
          py: { xs: 5, md: 1 },
        }}
      >
        <TabContext value={value}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
              sx={{ my: 5 }}
            >
              <Tab label="Drivers" value="1" />
              <Tab label="Teams" value="2" />
              <Tab label="Countries" value="3" />
            </Tabs>
          </Box>
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
            }}
          >
            <TabPanel value="1" sx={{ textAlign: "center" }}>
              1111111111111111111sssssssssssssssssssssss
              <br />
              1111111111111111111sssssssssssssssssssssss
              <br />
              1111111111111111111sssssssssssssssssssssss
              <br />
              1111111111111111111sssssssssssssssssssssss
              <br />
            </TabPanel>
            <TabPanel value="2" sx={{ textAlign: "center" }}>
              2222
            </TabPanel>
            <TabPanel value="3" sx={{ textAlign: "center" }}>
              3333
            </TabPanel>
          </Box>
        </TabContext>
      </Container>
      <div className={styles.grid}></div>
    </main>
  );
}
