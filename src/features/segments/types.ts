import type { Tag } from "../tags/types";

export interface Segment {
  range: TextRange;
  tags: Set<Tag>;
}

export type SegmentId = `${number}-${number}`;

export type Segments = Map<SegmentId, Segment>;

export interface TextRange {
  start: number;
  end: number;
}
