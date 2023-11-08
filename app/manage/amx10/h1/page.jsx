import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AMX10_H1 from "./AMX10_H1";

export default async function page() {
  const session = await getServerSession(authOptions);

  return <>{session === null ? <>로그인 하세요</> : <AMX10_H1 />}</>;
}
