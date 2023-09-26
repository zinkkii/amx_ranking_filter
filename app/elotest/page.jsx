"use client";

import Layout from "../layouts/layout";
import ConvertTest from "./ConvertTest";
import TanQueryTest from "./TanQueryTest";
import EloTable from "./EloTable";
import EloUpdate2 from "./EloUpdate2";

export default function Page() {
  return (
    <Layout>
      {/* <ConvertTest /> */}
      <TanQueryTest />
      <EloUpdate2 />
      {/* <EloTable /> */}
    </Layout>
  );
}
