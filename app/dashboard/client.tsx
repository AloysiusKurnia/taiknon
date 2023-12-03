'use client';

import { Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardResponse } from "../api/dashboard/route";
import CircleDisplay from "@/components/circleChecklists/CircleDisplay";

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
  });

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
        <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>

        <h2>Daily progress</h2>
        <table>
          {
            Object
              .entries(fetchedData.last7daysCompletions)
              .map(([goal, completions]) => <tr key={goal}>
                <th>
                  {goal}
                </th>
                {completions.map((completion, i) => <td key={`${goal}:${i}`}>
                  <CircleDisplay status={completion} />
                </td>)}
              </tr>)
          }
        </table>
        <button>
          {
            fetchedData.markedProgressToday ?
              "Edit your today's daily completion" :
              "Mark your today's daily completion"
          }
        </button>
        <h2>Your journal today</h2>
        <p>
          {
            fetchedData.todayJournalEntry ??
            "You haven't written anything for today."
          }
        </p>
        <button>
          {
            fetchedData.todayJournalEntry ?
              "Edit your journal" :
              "Write a journal for today"
          }
        </button>

      </main>
    </SessionProvider>;
  }
}