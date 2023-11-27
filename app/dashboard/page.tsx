import { getServerSession } from "next-auth";
import Link from "next/link";
import DashboardLoggedIn from "./DashboardLoggedIn";

export default async function Dashboard() {
  const session = await getServerSession();
  if (session) {
    return <DashboardLoggedIn session={session} />;
  }

  return <main>
    <h1>Hello, you&apos;re not logged in.</h1>
    <Link href="/login">
      <button>Login</button>
    </Link>
  </main>;
}