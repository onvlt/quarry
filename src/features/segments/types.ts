import type { TagId } from "../tags/types";

export interface Segment {
  start: number;
  end: number;
  tags: Array<TagId>;
}
