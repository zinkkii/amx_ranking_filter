"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "../layouts/layout";
import Result_R2_H2 from "./Result_R2_H2";

export default function R2_H2() {
  const router = useRouter();
  useEffect(() => {
    router.push("/r2_h2");
  }, []);
  return (
    <Layout>
      <Result_R2_H2 />
    </Layout>
  );
}
