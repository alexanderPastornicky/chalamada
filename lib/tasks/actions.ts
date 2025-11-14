"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionState } from "@/lib/types/action-state";

const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required").trim(),
  description: z.string().trim().optional(),
  labelIds: z.array(z.number()).optional(),
});

export async function createTask(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const labelIdsStr = formData.get("labelIds");
  const labelIds = labelIdsStr
    ? JSON.parse(labelIdsStr as string).map((id: string) => parseInt(id, 10))
    : [];

  const validatedFields = createTaskSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    labelIds: labelIds.length > 0 ? labelIds : undefined,
  });

  if (!validatedFields.success) {
    return {
      error: z.prettifyError(validatedFields.error),
    };
  }

  try {
    await prisma.task.create({
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description || null,
        labels: validatedFields.data.labelIds && validatedFields.data.labelIds.length > 0
          ? {
              connect: validatedFields.data.labelIds.map((labelId) => ({
                id: labelId,
              })),
            }
          : undefined,
      },
    });
    refresh();
    return { success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: "Failed to create task" };
  }
}

const updateTaskSchema = z.object({
  name: z.string().min(1, "Task name is required").trim(),
  description: z.string().trim().optional(),
  labelIds: z.array(z.number()).optional(),
});

export async function updateTask(
  id: number,
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const labelIdsStr = formData.get("labelIds");
  const labelIds = labelIdsStr
    ? JSON.parse(labelIdsStr as string).map((id: string) => parseInt(id, 10))
    : [];

  const validatedFields = updateTaskSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    labelIds: labelIds.length > 0 ? labelIds : undefined,
  });

  if (!validatedFields.success) {
    return {
      error: z.prettifyError(validatedFields.error),
    };
  }

  try {
    await prisma.task.update({
      where: { id },
      data: {
        name: validatedFields.data.name,
        description: validatedFields.data.description || null,
        labels: validatedFields.data.labelIds && validatedFields.data.labelIds.length > 0
          ? {
              set: validatedFields.data.labelIds.map((labelId) => ({
                id: labelId,
              })),
            }
          : {
              set: [],
            },
      },
    });
    refresh();
    return { success: true };
  } catch (error) {
    console.error("Error updating task:", error);
    return { error: "Failed to update task" };
  }
}

export async function deleteTask(
  id: number,
  prevState: ActionState | null
): Promise<ActionState> {
  try {
    await prisma.task.delete({ where: { id } });
    refresh();
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { error: "Failed to delete task" };
  }
}

export async function startTimeEntry(
  taskId: number,
  prevState: ActionState | null
): Promise<ActionState> {
  try {
    // Check if there's already an active time entry for this task
    const activeEntry = await prisma.timeEntry.findFirst({
      where: {
        taskId,
        endTime: null,
      },
    });

    if (activeEntry) {
      return { error: "There is already an active time entry for this task" };
    }

    // Create new time entry and reset completedAt if task was done
    await prisma.$transaction([
      prisma.timeEntry.create({
        data: {
          taskId,
          startTime: new Date(),
          source: "TRACKER",
        },
      }),
      prisma.task.update({
        where: { id: taskId },
        data: {
          completedAt: null,
        },
      }),
    ]);
    refresh(); 
    return { success: true };
  } catch (error) {
    console.error("Error starting time entry:", error);
    return { error: "Failed to start time entry" };
  }
}

export async function pauseTimeEntry(
  taskId: number,
  prevState: ActionState | null
): Promise<ActionState> {
  try {
    const activeTimeEntry = await prisma.timeEntry.findFirst({
      where: {
        taskId,
        endTime: null,
      },
    });

    if (!activeTimeEntry) {
      return { error: "No active time entry found" };
    }

    await prisma.timeEntry.update({
      where: { id: activeTimeEntry.id },
      data: {
        endTime: new Date(),
      },
    });
    refresh();
    return { success: true };
  } catch (error) {
    console.error("Error pausing time entry:", error);
    return { error: "Failed to pause time entry" };
  }
}

export async function stopTask(
  taskId: number,
  prevState: ActionState | null
): Promise<ActionState> {
  try {
    // Complete all active time entries and mark task as done in a transaction
    await prisma.$transaction([
      prisma.timeEntry.updateMany({
        where: {
          taskId,
          endTime: null,
        },
        data: {
          endTime: new Date(),
        },
      }),
      prisma.task.update({
        where: { id: taskId },
        data: {
          completedAt: new Date(),
        },
      }),
    ]);
    refresh();
    return { success: true };
  } catch (error) {
    console.error("Error stopping task:", error);
    return { error: "Failed to stop task" };
  }
}

