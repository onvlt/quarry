import type { Tag } from "../tags/types";
import type { Segment, SegmentKey, TextRange } from "./types";

export function createSegment(range: TextRange, tags: Set<Tag>): Segment {
  return { range, tags };
}

export function rangeToKey({ start, end }: TextRange): SegmentKey {
  return `${start}-${end}`;
}

export function rangeToTuple({
  start,
  end,
}: TextRange): [start: number, end: number] {
  return [start, end];
}

export function rangeFromTuple(tuple: [start: number, end: number]): TextRange {
  const [start, end] = tuple.toSorted((a, b) => a - b);
  return { start, end };
}
