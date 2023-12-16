import type { Doc } from "../docs/types";
import type { Tag } from "../tags/types";
import type { Segment, TextRange } from "./types";

export function createSegment(range: TextRange, tags: Set<Tag>): Segment {
  return { range, tags };
}

export function rangesEqual(a: TextRange, b: TextRange): boolean {
  return a[0] === b[0] && a[1] === b[1];
}
