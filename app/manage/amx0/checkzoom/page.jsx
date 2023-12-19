import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import CheckZoom from "./CheckZoom";

export default async function page() {
  const session = await getServerSession(authOptions);

  return <>{session === null ? <>로그인하세요</> : <CheckZoom />}</>;
}
