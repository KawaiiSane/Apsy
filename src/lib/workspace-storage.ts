import { DEFAULT_ITEMS, STORAGE_KEY } from "./constants";
import type { WorkspaceData, WorkspaceItem } from "./types";

export function createDefaultWorkspace(): WorkspaceData {
  return {
    studentName: "",
    items: [...DEFAULT_ITEMS],
  };
}

export function loadWorkspace(): WorkspaceData {
  if (typeof window === "undefined") return createDefaultWorkspace();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultWorkspace();
    const parsed = JSON.parse(raw) as WorkspaceData;
    if (!parsed.items?.length) return createDefaultWorkspace();
    return parsed;
  } catch {
    return createDefaultWorkspace();
  }
}

export function saveWorkspace(data: WorkspaceData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createItem(
  partial: Pick<WorkspaceItem, "title" | "description" | "discipline" | "type" | "tags">
): WorkspaceItem {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    title: partial.title,
    description: partial.description,
    discipline: partial.discipline,
    type: partial.type,
    status: "idea",
    tags: partial.tags,
    linkedIds: [],
    createdAt: now,
    updatedAt: now,
  };
}
