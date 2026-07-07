import { DEFAULT_ITEMS } from "./constants";
import { prisma } from "./db";
import type {
  Discipline,
  ItemStatus,
  ItemType,
  WorkspaceData,
  WorkspaceItem,
} from "./types";

function toWorkspaceItem(row: {
  id: string;
  title: string;
  description: string;
  discipline: string;
  type: string;
  status: string;
  tags: string[];
  linkedIds: string[];
  createdAt: Date;
  updatedAt: Date;
}): WorkspaceItem {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    discipline: row.discipline as Discipline,
    type: row.type as ItemType,
    status: row.status as ItemStatus,
    tags: row.tags,
    linkedIds: row.linkedIds,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

async function seedDefaultItems(userId: string) {
  await prisma.workspaceItem.createMany({
    data: DEFAULT_ITEMS.map((item) => ({
      id: item.id,
      userId,
      title: item.title,
      description: item.description,
      discipline: item.discipline,
      type: item.type,
      status: item.status,
      tags: [...item.tags],
      linkedIds: [...item.linkedIds],
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    })),
  });
}

export async function getWorkspace(userId: string): Promise<WorkspaceData> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { workspaceItems: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.workspaceItems.length === 0) {
    await seedDefaultItems(userId);
    const refreshed = await prisma.user.findUnique({
      where: { id: userId },
      include: { workspaceItems: true },
    });
    return {
      studentName: refreshed?.studentName ?? "",
      items: (refreshed?.workspaceItems ?? []).map(toWorkspaceItem),
    };
  }

  return {
    studentName: user.studentName,
    items: user.workspaceItems.map(toWorkspaceItem),
  };
}

export async function saveWorkspace(
  userId: string,
  data: WorkspaceData
): Promise<WorkspaceData> {
  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { studentName: data.studentName },
    });

    await tx.workspaceItem.deleteMany({ where: { userId } });

    if (data.items.length > 0) {
      await tx.workspaceItem.createMany({
        data: data.items.map((item) => ({
          id: item.id,
          userId,
          title: item.title,
          description: item.description,
          discipline: item.discipline,
          type: item.type,
          status: item.status,
          tags: item.tags,
          linkedIds: item.linkedIds,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        })),
      });
    }
  });

  return getWorkspace(userId);
}
