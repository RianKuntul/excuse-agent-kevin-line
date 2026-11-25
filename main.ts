import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse this agent hands its human after shipping a bug.
const ENTRY_LINE =
  "In my defense, the bug only appears when someone actually uses the feature, and I assumed nobody would.";

// Gate: the entry must be one line of 1-200 characters, no trailing newline.
function checkLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

function main(): void {
  checkLine(ENTRY_LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
}

main();
