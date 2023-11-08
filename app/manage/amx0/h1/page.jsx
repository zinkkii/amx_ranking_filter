import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AMX0_H1 from "./AMX0_H1";

export default async function page() {
  const session = await getServerSession(authOptions);

  return <>{session === null ? <>널임</> : <AMX0_H1 />}</>;
}
