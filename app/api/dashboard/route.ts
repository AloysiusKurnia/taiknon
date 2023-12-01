import { getServerSession } from "next-auth";
import prisma from "@/util/prisma";
import { $Enums } from "@prisma/client";
import jsonResponse from "@/util/jsonResponse";

export interface DashboardResponse {
    wroteJournalToday: boolean;
    markedProgressToday: boolean;
    last7daysCompletions: Record<string, ($Enums.CompletionCriteria | null)[]>;
}

const DAYS = 24 * 60 * 60 * 1000;

export async function GET() {
    const session = await getServerSession();
    if (!session || !session.user) {
        return new Response(null, { status: 401 });
    }
    const todayStamp = new Date().setUTCHours(0, 0, 0, 0);

    const username = session.user.name ?? '';
    const [lastWritingData, lastCompletions] = await Promise.all([
        prisma.user.findFirst({
            where: { username },
            select: { lastCompletion: true, lastJournal: true }
        }),
        prisma.completion.findMany({
            where: {
                date: { gte: new Date(todayStamp - DAYS * 7) },
                goal: { subject: { username } }
            },
            select: {
                date: true,
                criteria: true,
                goal: { select: { title: true } }
            }
        })
    ]);

    if (!lastWritingData) {
        return new Response(null, { status: 404 });
    }
    const { lastCompletion, lastJournal } = lastWritingData;
    const wroteJournalToday = lastJournal?.getTime() === todayStamp;
    const markedProgressToday = lastCompletion?.getTime() === todayStamp;
    const last7daysCompletions = generateCompletionTable(lastCompletions);
    return jsonResponse<DashboardResponse>({
        wroteJournalToday,
        markedProgressToday,
        last7daysCompletions
    });
}

/**
 * Creates a table of goals and their completions
 * 
 * @param lastCompletions Completions object taken directly from prisma
 * @returns An object; mapping goals to an array containing 8 elements,
 *          each containing CompletionCriteria | null, with the first element
 *          being today's completion status.
 */
function generateCompletionTable(lastCompletions: {
    date: Date;
    criteria: $Enums.CompletionCriteria | null;
    goal: { title: string; };
}[]) {
    const goals: Record<string, ($Enums.CompletionCriteria | null)[]> = {};
    const todayStamp = new Date().setUTCHours(0, 0, 0, 0);
    for (const completion of lastCompletions) {
        const goal = completion.goal.title;
        if (!goals[goal]) {
            goals[goal] = new Array(8).fill(null);
        }

        const completionStamp = completion.date.getTime();
        const dayDiff = Math.floor((todayStamp - completionStamp) / DAYS);

        goals[goal][dayDiff] = completion.criteria;
    }
    return goals;
}