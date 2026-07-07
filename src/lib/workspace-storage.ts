export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createItem(
  partial: Pick<
    import("./types").WorkspaceItem,
    "title" | "description" | "discipline" | "type" | "tags"
  >
): import("./types").WorkspaceItem {
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
