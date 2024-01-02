import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AdminLogin from "../Login";
import AMX10 from "./AMX10";

export default async function Amx10() {
  const session = await getServerSession(authOptions);

  return <>{session === null ? <AdminLogin /> : <AMX10 />}</>;
}
