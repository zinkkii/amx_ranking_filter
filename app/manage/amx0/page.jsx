import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AdminLogin from "../Login";
import AMXZero from "./AMXZero";

export default async function Amx0() {
  const session = await getServerSession(authOptions);
  return <>{session === null ? <AdminLogin /> : <AMXZero />}</>;
}
