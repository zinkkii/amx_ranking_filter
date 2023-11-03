import "./globals.css";
import { Inter } from "next/font/google";
import Layout from "./layouts/layout";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "AMX_RANKING",
  description: "AMX_RANKING",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Layout children={children}></Layout>
      </body>
    </html>
  );
}
