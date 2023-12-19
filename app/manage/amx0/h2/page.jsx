import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AMX0_H2 from "./AMX0_H2";
import AMX0_H2_Upload from "./AMX0_H2_Upload";

export default async function page() {
  const session = await getServerSession(authOptions);

  // return <>{session === null ? <>로그인 하세요</> : <AMX0_H2 />}</>;
  return <>{session === null ? <>로그인 하세요</> : <AMX0_H2_Upload />}</>;
}
