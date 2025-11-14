import { cache } from "react";
import prisma from "@/lib/prisma";

export const getLabels = cache(async () => {
  return prisma.label.findMany({
    orderBy: { name: "asc" },
  });
});