import prisma from "@/lib/prisma";
import { TaskStatus } from "./types";
import { Prisma } from "@/prisma/generated/prisma/client";

const STATUS_FILTERS: Record<TaskStatus, Prisma.TaskWhereInput> = {
  done: { completedAt: { not: null } },
  "in-progress": {
    completedAt: null,
    timeEntries: { some: {} },
  },
  todo: {
    completedAt: null,
    timeEntries: { none: {} },
  },
};

function buildWhereClause(
  labelNames: string[],
  statuses: TaskStatus[]
): Prisma.TaskWhereInput | undefined {
  const conditions: Prisma.TaskWhereInput[] = [];

  if (labelNames.length > 0) {
    conditions.push({
      AND: labelNames.map((name) => ({
        labels: { some: { name } },
      })),
    });
  }

  if (statuses.length > 0) {
    conditions.push({
      OR: statuses.map((status) => STATUS_FILTERS[status]),
    });
  }

  return conditions.length > 0 ? { AND: conditions } : undefined;
}

export async function getTasks(
  labelNames: string[],
  statuses: TaskStatus[] = []
) {
  const whereClause = buildWhereClause(labelNames, statuses);
  
  // Get all tasks matching the filters
  const tasks = await prisma.task.findMany({
    where: whereClause,
    include: {
      timeEntries: {
        orderBy: { createdAt: "desc" },
      },
      labels: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return tasks
}

export type TaskWithTimeEntries = Awaited<ReturnType<typeof getTasks>>[number];

