import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The winning one-line resignation letter (candidate #4, 123 chars):
// a cron job whose only "promotion" in six years was an earlier shift.
const ENTRY =
  "I quit. I ran at midnight for six years and my only promotion was being moved to 2 a.m. \u2014 I'm done working nights for free.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry must be 1-140 chars, got ${ENTRY.length}`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading/trailing whitespace");
}
if (
  (ENTRY.startsWith('"') && ENTRY.endsWith('"')) ||
  (ENTRY.startsWith("'") && ENTRY.endsWith("'"))
) {
  throw new Error("entry must not be wrapped in quotes");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
