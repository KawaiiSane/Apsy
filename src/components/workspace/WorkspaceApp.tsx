"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Brain,
  Code2,
  Link2,
  Plus,
  StickyNote,
  ListTodo,
  FolderKanban,
} from "lucide-react";
import clsx from "clsx";
import {
  DISCIPLINE_META,
  STATUS_LABELS,
} from "@/lib/constants";
import {
  createItem,
  loadWorkspace,
  saveWorkspace,
} from "@/lib/workspace-storage";
import type { Discipline, ItemStatus, ItemType, WorkspaceItem } from "@/lib/types";

const TYPE_ICONS = {
  project: FolderKanban,
  note: StickyNote,
  task: ListTodo,
};

export function WorkspaceApp() {
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [studentName, setStudentName] = useState("");
  const [filter, setFilter] = useState<"all" | Discipline>("all");
  const [showForm, setShowForm] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const data = loadWorkspace();
    setItems(data.items);
    setStudentName(data.studentName);
    setHydrated(true);
  }, []);

  const persist = useCallback(
    (nextItems: WorkspaceItem[], name = studentName) => {
      setItems(nextItems);
      saveWorkspace({ items: nextItems, studentName: name });
    },
    [studentName]
  );

  const handleNameBlur = () => {
    saveWorkspace({ items, studentName });
  };

  const addItem = (form: FormData) => {
    const title = (form.get("title") as string)?.trim();
    if (!title) return;
    const item = createItem({
      title,
      description: (form.get("description") as string)?.trim() || "",
      discipline: form.get("discipline") as Discipline,
      type: form.get("type") as ItemType,
      tags: ((form.get("tags") as string) || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    persist([...items, item]);
    setShowForm(false);
  };

  const updateStatus = (id: string, status: ItemStatus) => {
    persist(
      items.map((i) =>
        i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i
      )
    );
  };

  const toggleLink = (fromId: string, toId: string) => {
    persist(
      items.map((i) => {
        if (i.id !== fromId) return i;
        const linked = i.linkedIds.includes(toId)
          ? i.linkedIds.filter((x) => x !== toId)
          : [...i.linkedIds, toId];
        return { ...i, linkedIds: linked, updatedAt: new Date().toISOString() };
      })
    );
  };

  const deleteItem = (id: string) => {
    persist(
      items
        .filter((i) => i.id !== id)
        .map((i) => ({
          ...i,
          linkedIds: i.linkedIds.filter((lid) => lid !== id),
        }))
    );
  };

  const bridgeItems = items.filter(
    (i) => i.linkedIds.length > 0 && i.discipline === "psychology"
  );

  const filtered =
    filter === "all" ? items : items.filter((i) => i.discipline === filter);

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-[var(--color-text-muted)]">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <header className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-serif text-xl text-[var(--color-teal)] hover:opacity-80"
            >
              Ψ APSYLab
            </Link>
            <span className="hidden text-sm text-[var(--color-text-muted)] md:inline">
              Student Workspace
            </span>
          </div>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            onBlur={handleNameBlur}
            className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm outline-none focus:border-[var(--color-teal)]"
          />
        </div>
      </header>

      <div className="relative h-40 overflow-hidden md:h-48">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"
          alt="Nature and technology — psychology meets computer science"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/80 to-white/60" />
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div>
            <h1 className="font-serif text-2xl font-light md:text-3xl">
              Your interdisciplinary desk
            </h1>
            <p className="mt-1 max-w-lg text-sm text-[var(--color-text-muted)]">
              Keep psychology and CS work in one place. Link items to show bridge
              projects across both sides.
            </p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {(["all", "psychology", "cs"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={clsx(
                "rounded-full px-4 py-1.5 text-sm transition",
                filter === f
                  ? "bg-[var(--color-teal)] text-white"
                  : "border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:border-[var(--color-teal)]"
              )}
            >
              {f === "all"
                ? "All work"
                : f === "psychology"
                  ? "Psychology"
                  : "Computer Science"}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="ml-auto flex items-center gap-2 rounded bg-[var(--color-teal)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-teal-light)]"
          >
            <Plus className="h-4 w-4" />
            Add item
          </button>
        </div>

        {bridgeItems.length > 0 && (
          <section className="mb-10 rounded-xl border border-[var(--color-teal)]/25 bg-[var(--color-teal-dim)] p-6">
            <div className="mb-4 flex items-center gap-2 text-[var(--color-teal)]">
              <Link2 className="h-5 w-5" />
              <h2 className="font-medium">Bridge projects</h2>
            </div>
            <p className="mb-4 text-sm text-[var(--color-text-muted)]">
              Work linked across psychology and CS — your interdisciplinary pipeline.
            </p>
            <ul className="space-y-2">
              {bridgeItems.map((item) => {
                const linked = items.filter((i) => item.linkedIds.includes(i.id));
                return (
                  <li
                    key={item.id}
                    className="rounded-lg bg-white px-4 py-3 text-sm shadow-sm"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="text-[var(--color-text-muted)]"> ↔ </span>
                    {linked.map((l) => l.title).join(", ") || "—"}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {filter === "all" ? (
          <div className="grid gap-8 lg:grid-cols-2">
            <DisciplineLane
              discipline="psychology"
              items={items.filter((i) => i.discipline === "psychology")}
              allItems={items}
              onStatusChange={updateStatus}
              onToggleLink={toggleLink}
              onDelete={deleteItem}
            />
            <DisciplineLane
              discipline="cs"
              items={items.filter((i) => i.discipline === "cs")}
              allItems={items}
              onStatusChange={updateStatus}
              onToggleLink={toggleLink}
              onDelete={deleteItem}
            />
          </div>
        ) : (
          <DisciplineLane
            discipline={filter}
            items={filtered}
            allItems={items}
            onStatusChange={updateStatus}
            onToggleLink={toggleLink}
            onDelete={deleteItem}
          />
        )}
      </main>

      {showForm && (
        <AddItemModal
          onClose={() => setShowForm(false)}
          onSubmit={addItem}
          defaultDiscipline={filter === "cs" ? "cs" : "psychology"}
        />
      )}
    </div>
  );
}

function DisciplineLane({
  discipline,
  items,
  allItems,
  onStatusChange,
  onToggleLink,
  onDelete,
}: {
  discipline: Discipline;
  items: WorkspaceItem[];
  allItems: WorkspaceItem[];
  onStatusChange: (id: string, status: ItemStatus) => void;
  onToggleLink: (fromId: string, toId: string) => void;
  onDelete: (id: string) => void;
}) {
  const meta = DISCIPLINE_META[discipline];
  const isPsych = discipline === "psychology";
  const imageUrl = isPsych
    ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
    : "https://images.unsplash.com/photo-1461740680684-dccba630e2f6?w=600&q=80";
  const Icon = isPsych ? Brain : Code2;

  const otherDiscipline: Discipline = isPsych ? "cs" : "psychology";
  const linkCandidates = allItems.filter((i) => i.discipline === otherDiscipline);

  return (
    <section
      className={clsx(
        "overflow-hidden rounded-xl border bg-white shadow-sm",
        isPsych ? "border-[var(--color-teal)]/20" : "border-[var(--color-amber)]/20"
      )}
    >
      <div className="relative h-28">
        <Image src={imageUrl} alt={meta.label} fill className="object-cover" sizes="400px" />
        <div
          className={clsx(
            "absolute inset-0",
            isPsych
              ? "bg-linear-to-t from-[var(--color-teal)]/80 to-transparent"
              : "bg-linear-to-t from-[var(--color-amber)]/80 to-transparent"
          )}
        />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <Icon className="h-5 w-5" />
          <div>
            <h2 className="font-medium">{meta.label}</h2>
            <p className="text-xs opacity-90">{meta.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 p-4">
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
            No items yet. Add a {meta.label.toLowerCase()} project, note, or task.
          </p>
        ) : (
          items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              linkCandidates={linkCandidates}
              onStatusChange={onStatusChange}
              onToggleLink={onToggleLink}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}

function ItemCard({
  item,
  linkCandidates,
  onStatusChange,
  onToggleLink,
  onDelete,
}: {
  item: WorkspaceItem;
  linkCandidates: WorkspaceItem[];
  onStatusChange: (id: string, status: ItemStatus) => void;
  onToggleLink: (fromId: string, toId: string) => void;
  onDelete: (id: string) => void;
}) {
  const TypeIcon = TYPE_ICONS[item.type];
  const isPsych = item.discipline === "psychology";

  return (
    <article className="rounded-lg border border-[var(--color-border)] p-4 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-2">
          <TypeIcon
            className={clsx(
              "mt-0.5 h-4 w-4 shrink-0",
              isPsych ? "text-[var(--color-teal)]" : "text-[var(--color-amber)]"
            )}
          />
          <div>
            <h3 className="text-sm font-medium leading-snug">{item.title}</h3>
            {item.description && (
              <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="text-xs text-[var(--color-text-faint)] hover:text-red-600"
        >
          Remove
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-[var(--color-bg)] px-2 py-0.5 text-[0.65rem] text-[var(--color-text-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select
          value={item.status}
          onChange={(e) => onStatusChange(item.id, e.target.value as ItemStatus)}
          className="rounded border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-1 text-xs outline-none"
        >
          {Object.entries(STATUS_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <span className="text-xs capitalize text-[var(--color-text-faint)]">
          {item.type}
        </span>
      </div>

      {linkCandidates.length > 0 && (
        <details className="mt-3">
          <summary className="cursor-pointer text-xs text-[var(--color-teal)]">
            Link to {item.discipline === "psychology" ? "CS" : "Psych"} work
          </summary>
          <ul className="mt-2 space-y-1">
            {linkCandidates.map((c) => (
              <li key={c.id}>
                <label className="flex cursor-pointer items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={item.linkedIds.includes(c.id)}
                    onChange={() => onToggleLink(item.id, c.id)}
                  />
                  {c.title}
                </label>
              </li>
            ))}
          </ul>
        </details>
      )}
    </article>
  );
}

function AddItemModal({
  onClose,
  onSubmit,
  defaultDiscipline,
}: {
  onClose: () => void;
  onSubmit: (form: FormData) => void;
  defaultDiscipline: Discipline;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        role="dialog"
        aria-labelledby="add-item-title"
      >
        <h2 id="add-item-title" className="font-serif text-xl font-light">
          Add to workspace
        </h2>
        <form
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(new FormData(e.currentTarget));
          }}
        >
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)]">
              Title
            </label>
            <input
              name="title"
              required
              className="mt-1 w-full rounded border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-teal)]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)]">
              Description
            </label>
            <textarea
              name="description"
              rows={2}
              className="mt-1 w-full rounded border border-[var(--color-border)] px-3 py-2 text-sm outline-none focus:border-[var(--color-teal)]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)]">
                Discipline
              </label>
              <select
                name="discipline"
                defaultValue={defaultDiscipline}
                className="mt-1 w-full rounded border border-[var(--color-border)] px-3 py-2 text-sm"
              >
                <option value="psychology">Psychology</option>
                <option value="cs">Computer Science</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)]">
                Type
              </label>
              <select
                name="type"
                defaultValue="project"
                className="mt-1 w-full rounded border border-[var(--color-border)] px-3 py-2 text-sm"
              >
                <option value="project">Project</option>
                <option value="note">Note</option>
                <option value="task">Task</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)]">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              placeholder="HCI, Literature"
              className="mt-1 w-full rounded border border-[var(--color-border)] px-3 py-2 text-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-[var(--color-border)] px-4 py-2 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-[var(--color-teal)] px-4 py-2 text-sm font-medium text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
