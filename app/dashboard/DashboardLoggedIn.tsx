'use client';

import { Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";

export default function DashboardLoggedIn({ session }: { session: Session; }) {
  return <SessionProvider session={session}>
    <main>
      <h1>Dashboard</h1>
      <p>Welcome {session.user?.name}</p>

      <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
    </main>
  </SessionProvider>;
}