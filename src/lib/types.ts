export type Discipline = "psychology" | "cs";

export type ItemType = "project" | "note" | "task";

export type ItemStatus = "idea" | "active" | "review" | "done";

export interface WorkspaceItem {
  id: string;
  title: string;
  description: string;
  discipline: Discipline;
  type: ItemType;
  status: ItemStatus;
  tags: string[];
  linkedIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceData {
  items: WorkspaceItem[];
  studentName: string;
}
