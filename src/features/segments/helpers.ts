import type { Tag } from "../tags/types";
import type { Segment, SegmentKey, TextRange } from "./types";

export function createSegment(range: TextRange, tags: Set<Tag>): Segment {
  return { range, tags };
}

export function rangeToKey([start, end]: TextRange): SegmentKey {
  return `${start}-${end}`;
}
