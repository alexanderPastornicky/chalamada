"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionState } from "@/lib/types/action-state";

const createTaskSchema = z.object({
  name: z.string().min(1, "Task name is required").trim(),
  description: z.string().trim().optional(),
});

export async function createTask(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = createTaskSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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
      },
    });
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: "Failed to create task" };
  }
}

const updateTaskSchema = z.object({
  name: z.string().min(1, "Task name is required").trim(),
  description: z.string().trim().optional(),
});

export async function updateTask(
  id: number,
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const validatedFields = updateTaskSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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
      },
    });
    revalidatePath("/app");
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
    revalidatePath("/app");
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { error: "Failed to delete task" };
  }
}

