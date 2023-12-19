import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AMX10_Q from "./AMX10_Q";
import AMX10_Q_Upload from "./AMX10_Q_Upload";

export default async function page() {
  const session = await getServerSession(authOptions);

  // return <>{session === null ? <>로그인하세요</> : <AMX10_Q />}</>;
  return <>{session === null ? <>로그인하세요</> : <AMX10_Q_Upload />}</>;
}
