import type { Tag } from "../tags/types";

export interface Segment {
  range: TextRange;
  tags: Set<Tag>;
}

export type TextRange = [start: number, end: number];
