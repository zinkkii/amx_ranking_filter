import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import AdminLogin from "./Login";
import DashBoard from "./DashBoard";

export default async function Auth() {
  const session = await getServerSession(authOptions);
  return (
    <>{session === null ? <AdminLogin /> : <DashBoard session={session} />}</>
  );
}
