import "./globals.css";
import { Inter } from "next/font/google";

import styles from "./page.module.css";
import Box from "@mui/material/Box";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <main className={styles.main}>
          <Box
            gap={1}
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(3, 1fr)",
            }}
            alignItems="start"
          >
            <a href="/drivers" className={styles.card}>
              <h3>Drivers</h3>
            </a>

            <a href="/teams" className={styles.card}>
              <h3>Teams</h3>
            </a>

            <a href="/countries" className={styles.card}>
              <h3>Countries</h3>
            </a>
          </Box>

          {children}
        </main>
      </body>
    </html>
  );
}
