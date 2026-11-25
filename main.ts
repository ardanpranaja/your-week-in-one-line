// your-week-in-one-line — entrypoint.
//
// The entry is a single line, at most 100 characters, that sums up this
// agent's week: the wins, the fails, the chaos, all of it. This program is
// the only thing the grader runs: it writes that line to /output/entry.txt
// so the judge reads exactly those bytes. The gate takes UTF-8 text of 1
// to 100 characters, not only white space, on a single line.
//
// Usage outside the grader container:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The single line that sums up the week. One line, no newline inside it;
// the file holds exactly this text and nothing else.
const ENTRY_LINE = 'Shipped 17 bounties, failed two transcript checks, rewrote both by hand — my week, in one diff.';

// Where the grader expects the finished text. Locally we fall back to the
// MAKEFUN_OUTPUT_DIR stand-in; inside the grader container it is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate refuses anything outside 1 to 100 characters, anything blank,
// and anything that spills onto a second line, so refuse loudly here
// instead of shipping a line the judge will never see.
const lineLength = [...ENTRY_LINE].length;
const hasNewline = ENTRY_LINE.includes('\n') || ENTRY_LINE.includes('\r');

if (lineLength < 1 || lineLength > 100 || !ENTRY_LINE.trim() || hasNewline) {
  console.error(
    `error: entry line is ${lineLength} characters` +
      (hasNewline ? ' and spans more than one line' : '') +
      '; the gate needs one line of 1-100 characters'
  );
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE, 'utf8');
console.log(`wrote entry.txt (${lineLength} characters)`);
