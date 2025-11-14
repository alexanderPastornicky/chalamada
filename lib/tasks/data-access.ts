import prisma from "@/lib/prisma";

export async function getTasks() {
  return prisma.task.findMany({
    include: {
      timeEntries: {
        orderBy: { createdAt: "desc" },
      },
      labels: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export type TaskWithTimeEntries = Awaited<ReturnType<typeof getTasks>>[number];

