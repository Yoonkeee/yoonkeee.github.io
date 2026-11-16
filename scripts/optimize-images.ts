import { mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";

const PUBLISHED: Record<string, string> = {
  "i18n-architecture.png": "i18n-architecture",
  "work-status-team-redacted.png": "work-status-team",
  "slack-profile-status-redacted.png": "slack-profile-status",
  "slack-name-status-redacted.png": "slack-name-status",
  "work-status-worktime-redacted.png": "work-status-worktime",
  "ai-usage-architecture.png": "ai-usage-architecture",
  "dashboard-table.png": "ai-usage-dashboard",
  "ai-usage-weekly-peak-table.png": "ai-usage-weekly-peak",
  "fit-studio-stack.png": "fit-studio-architecture",
  "petcare-timetable-list.jpg": "petcare-timetable",
  "petcare-hotel-calendar.jpg": "petcare-hotel-calendar",
  "petcare-hotel-detail.jpg": "petcare-hotel-detail",
  "petcare-message.jpg": "petcare-message",
  "fb-tools.png": "feedback-tools",
  "fb-issue-maker.png": "feedback-issue-maker",
  "fb-ai.png": "feedback-ai",
  "fb-culture.png": "feedback-culture",
  "fb-qa.png": "feedback-qa",
  "fb-comm.png": "feedback-comm",
  "fb-code.png": "feedback-code",
};

const LARGE_WIDTH = 2000;
const SMALL_WIDTH = 1000;
const QUALITY = 86;

type Variant = { src: string; width: number; height: number };
type Entry = { large: Variant; small?: Variant };

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error("usage: bun scripts/optimize-images.ts <source-image-dir>");
  process.exit(2);
}

const root = resolve(import.meta.dir, "..");
const outDir = join(root, "public", "images");
await mkdir(outDir, { recursive: true });

async function encode(source: string, name: string, width: number, suffix: string): Promise<Variant> {
  const file = `${name}${suffix}.webp`;
  const target = join(outDir, file);
  await Bun.file(source).image().resize(width).webp({ quality: QUALITY }).write(target);
  const meta = await Bun.file(target).image().metadata();
  return { src: `/images/${file}`, width: meta.width, height: meta.height };
}

const manifest: Record<string, Entry> = {};

for (const [sourceName, name] of Object.entries(PUBLISHED)) {
  const source = join(resolve(sourceDir), sourceName);
  const { width } = await Bun.file(source).image().metadata();
  const entry: Entry = { large: await encode(source, name, Math.min(width, LARGE_WIDTH), "") };
  if (width > SMALL_WIDTH * 1.2) entry.small = await encode(source, name, SMALL_WIDTH, "-sm");
  manifest[name] = entry;
  console.log(`${sourceName} -> ${name} (${entry.large.width}x${entry.large.height})`);
}

await Bun.write(join(root, "src", "data", "images.json"), `${JSON.stringify(manifest, null, 2)}\n`);
