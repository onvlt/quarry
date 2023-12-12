import type { TagId } from "../tags/types";

export interface Segment {
  span: [start: number, end: number];
  tags: Array<TagId>;
}
