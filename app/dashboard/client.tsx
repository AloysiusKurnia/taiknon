'use client';

import { Session } from "next-auth";
import { SessionProvider, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardResponse } from "../api/dashboard/route";
import CircleDisplay from "@/components/circleChecklists/CircleDisplay";

import './layout.sass';
import Layout from "@/components/layout/Layout";

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
  let body: React.JSX.Element;

  if (!fetchedData) {
    body = <main>
      <p>
        Loading...
      </p>
    </main>;
  } else {
    body = <main>
      <div className="columns">
        <section>
          <h2>Daily progress</h2>
          <div className="scalable">
            {
              Object
                .entries(fetchedData.last7daysCompletions)
                .map(([goal, completions]) => <ul key={goal}>
                  <h3 className="scalable">
                    {goal}
                  </h3>
                  {completions.map((completion, i) => <li key={`${goal}:${i}`}>
                    <CircleDisplay status={completion} />
                  </li>)}
                </ul>)
            }
          </div>
          <button>
            {
              fetchedData.markedProgressToday ?
                "Edit your today's daily completion" :
                "Mark your today's daily completion"
            }
          </button>
          <button>
            See all your daily completions
          </button>
        </section>

        <section>
          <h2>Your journal today</h2>
          <p className="scalable">
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
          <button>
            See all your journals
          </button>
        </section>
      </div>
    </main>;
  }

  return <SessionProvider session={session}>
    <Layout username={session.user?.name ?? ""}>
      {body}
    </Layout>
  </SessionProvider>;
}