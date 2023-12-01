'use client';

import { Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardResponse } from "../api/dashboard/route";

export default function DashboardClient({ session }: { session: Session; }) {
  const [fetchedData, setFetchedData] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    if (fetchedData) {
      return;
    }
    async function fetchData() {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      setFetchedData(data);
    }
    fetchData();
  })

  if (!fetchedData) {
    return <main>
      <p>
        Loading...
      </p>
    </main>;
  } else {
    return <SessionProvider session={session}>
      <main>
        <h1>Dashboard</h1>
        <p>Welcome {session.user?.name}</p>

        <button>
          {
            fetchedData.wroteJournalToday ?
              "Edit your today's journal" :
              "Write a journal for today"
          }
        </button>
        <button>
          {
            fetchedData.markedProgressToday ?
              "Edit your today's daily completion" :
              "Mark your today's daily completion"
          }
        </button>
        <p>
          <pre>
            {JSON.stringify(fetchedData, null, 2)}
          </pre>
        </p>

        <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      </main>
    </SessionProvider>;
  }
}