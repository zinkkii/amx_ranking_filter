import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AMX10_Q from "./AMX10_Q";

export default async function page() {
  const session = await getServerSession(authOptions);

  return <>{session === null ? <>로그인하세요</> : <AMX10_Q />}</>;
}
