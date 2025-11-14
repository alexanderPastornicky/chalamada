import prisma from "@/lib/prisma";

export async function getTasks(labelNames: string[]) {
  return prisma.task.findMany({
    where: labelNames.length
      ? {
          AND: labelNames.map((labelName) => ({
            labels: {
              some: {
                name: labelName,
              },
            },
          })),
        }
      : undefined,
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

