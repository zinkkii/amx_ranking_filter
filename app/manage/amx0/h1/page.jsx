import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AMX0_H1 from "./AMX0_H1";
import AMX0_H1_Upload from "./AMX0_H1_Upload";

export default async function page() {
  const session = await getServerSession(authOptions);

  // return <>{session === null ? <>널임</> : <AMX0_H1 />}</>;
  return <>{session === null ? <>널임</> : <AMX0_H1_Upload />}</>;
}
