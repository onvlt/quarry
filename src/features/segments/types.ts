import type { Tag } from "../tags/types";

export interface Segment {
  range: TextRange;
  tags: Set<Tag>;
}

export type SegmentKey = `${number}-${number}`;

export type Segments = Map<SegmentKey, Segment>;

export interface TextRange {
  start: number;
  end: number;
}
