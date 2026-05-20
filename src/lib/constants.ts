import type { Discipline, ItemStatus } from "./types";

export const VERTICALS = [
  {
    num: "01",
    name: "Cognitive Load & UX",
    desc: "Psych students audit interfaces for attention and memory load. Engineers instrument, A/B test, and iterate.",
    tags: ["Attention", "HCI", "UX Testing"],
  },
  {
    num: "02",
    name: "Mental Health Tooling",
    desc: "Chat-based interventions, mood tracking, and crisis detection at the intersection of clinical insight and NLP.",
    tags: ["Clinical Psych", "NLP", "Crisis Detection"],
  },
  {
    num: "03",
    name: "Behavioral AI",
    desc: "Bias detection, persuasion analysis in LLM outputs, and the psychology behind model-human interaction.",
    tags: ["Bias Detection", "LLM Analysis", "Ethics"],
  },
  {
    num: "04",
    name: "Neuro-data & BCI",
    desc: "EEG and fMRI pipelines, sleep classification, attention modeling, and BCI research grounded in neuroscience.",
    tags: ["EEG / fMRI", "Sleep Research", "BCI"],
  },
  {
    num: "05",
    name: "EdPsych & EdTech",
    desc: "Learning curve modeling, adaptive systems, and tools informed by how people actually learn and forget.",
    tags: ["Learning Science", "Adaptive AI", "Memory"],
  },
  {
    num: "06",
    name: "Human-Computer Interaction",
    desc: "Eye tracking, response latency, and interface perception research with publication goals.",
    tags: ["Eye Tracking", "Perception", "Experiments"],
  },
] as const;

export const STATUS_LABELS: Record<ItemStatus, string> = {
  idea: "Idea",
  active: "In progress",
  review: "Review",
  done: "Done",
};

export const DISCIPLINE_META: Record<
  Discipline,
  { label: string; subtitle: string; accent: "teal" | "amber" }
> = {
  psychology: {
    label: "Psychology",
    subtitle: "Research, readings & clinical notes",
    accent: "teal",
  },
  cs: {
    label: "Computer Science",
    subtitle: "Code, systems & implementation",
    accent: "amber",
  },
};

export const STORAGE_KEY = "apsylab-workspace-v1";

export const DEFAULT_ITEMS = [
  {
    id: "psych-1",
    title: "Literature review: cognitive load in LLM interfaces",
    description: "Annotate papers on working memory and chat UX patterns.",
    discipline: "psychology" as Discipline,
    type: "project" as const,
    status: "active" as const,
    tags: ["HCI", "Literature"],
    linkedIds: ["cs-1"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cs-1",
    title: "Prototype: attention heatmap dashboard",
    description: "Next.js app to log gaze-proxy metrics from usability sessions.",
    discipline: "cs" as Discipline,
    type: "project" as const,
    status: "idea" as const,
    tags: ["Frontend", "Data viz"],
    linkedIds: ["psych-1"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "psych-2",
    title: "IRB checklist draft",
    description: "Ethics form for our joint study — due before pilot.",
    discipline: "psychology" as Discipline,
    type: "task" as const,
    status: "review" as const,
    tags: ["Ethics"],
    linkedIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cs-2",
    title: "Set up experiment logging API",
    description: "FastAPI endpoint for session events + export to CSV.",
    discipline: "cs" as Discipline,
    type: "task" as const,
    status: "active" as const,
    tags: ["Backend", "Python"],
    linkedIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
