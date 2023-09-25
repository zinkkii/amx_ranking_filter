"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "../layouts/layout";
import Result_R2_Q from "./Result_R2_Q";

export default function R2_Q() {
  const router = useRouter();
  useEffect(() => {
    router.push("/r2_q");
  }, []);
  return (
    <Layout>
      <Result_R2_Q />
    </Layout>
  );
}
