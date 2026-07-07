import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getWorkspace, saveWorkspace } from "@/lib/workspace-db";
import type { WorkspaceData } from "@/lib/types";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const workspace = await getWorkspace(session.user.id);
  return NextResponse.json(workspace);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as WorkspaceData;

  if (!body || !Array.isArray(body.items)) {
    return NextResponse.json({ error: "Invalid workspace data" }, { status: 400 });
  }

  const workspace = await saveWorkspace(session.user.id, {
    studentName: body.studentName ?? "",
    items: body.items,
  });

  return NextResponse.json(workspace);
}
