import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardClient from "./client";

export default async function Dashboard() {
  const session = await getServerSession();
  if (session) {
    return <DashboardClient session={session} />;
  } else {
    redirect("/login");
  }
}