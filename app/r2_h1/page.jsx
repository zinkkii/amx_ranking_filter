"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "../layouts/layout";
import Result_R2_H1 from "./Result_R2_H1";

export default function R2_Q() {
  const router = useRouter();
  useEffect(() => {
    router.push("/r2_h1");
  }, []);
  return (
    <Layout>
      <Result_R2_H1 />
    </Layout>
  );
}
