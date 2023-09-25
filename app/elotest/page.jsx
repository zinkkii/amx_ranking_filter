"use client";

import Layout from "../layouts/layout";
import ConvertTest from "./ConvertTest";
import TanQueryTest from "./TanQueryTest";
import EloTable from "./EloTable";

export default function Page() {
  return (
    <Layout>
      <ConvertTest />
      {/* <TanQueryTest /> */}
      <EloTable />
    </Layout>
  );
}
