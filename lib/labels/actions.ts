"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { ActionState } from "@/lib/types/action-state";

const createLabelSchema = z.object({
  name: z.string().min(1, "Label name is required").trim(),
  color: z.string().min(1, "Color is required"),
});

export async function createLabel(
  name: string,
  color: string
): Promise<ActionState & { labelId?: number }> {
  const validatedFields = createLabelSchema.safeParse({ name, color });

  if (!validatedFields.success) {
    return {
      error: z.prettifyError(validatedFields.error),
    };
  }

  try {
    const label = await prisma.label.create({
      data: {
        name: validatedFields.data.name,
        color: validatedFields.data.color,
      },
    });
    refresh();
    return { 
      success: true,
      labelId: label.id
    };
  } catch (error) {
    console.error("Error creating label:", error);
    return { 
      error: "Failed to create label"
    };
  }
}

