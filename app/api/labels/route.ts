import { NextResponse } from "next/server";
import { getLabels } from "@/lib/labels/data-access";

export async function GET() {
  try {
    const labels = await getLabels();
    return NextResponse.json(labels);
  } catch (error) {
    console.error("Error fetching labels:", error);
    return NextResponse.json(
      { error: "Failed to fetch labels" },
      { status: 500 }
    );
  }
}

