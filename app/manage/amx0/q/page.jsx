import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AMX0_Q from "./AMX0_Q";
import AMX0_Q_Upload from "./AMX0_Q_Upload";

export default async function page() {
  const session = await getServerSession(authOptions);

  // return <>{session === null ? <>로그인하세요</> : <AMX0_Q />}</>;
  return <>{session === null ? <>로그인하세요</> : <AMX0_Q_Upload />}</>;
}
