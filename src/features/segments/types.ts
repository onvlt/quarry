import type { Tag } from "../tags/types";

export interface Segment {
  range: TextRange;
  tags: Array<Tag>;
}

export type TextRange = [start: number, end: number];
