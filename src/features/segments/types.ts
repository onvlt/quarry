import type { TagId } from "../tags/types";

export interface Segment {
  id: number;
  range: TextRange;
  tags: Array<TagId>;
}

export type TextRange = [start: number, end: number];
