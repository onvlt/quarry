import type { Doc } from "../docs/types";
import type { Tag } from "../tags/types";
import type { Segment, TextRange } from "./types";

export function createSegment(range: TextRange, tags: Array<Tag>): Segment {
  return { range, tags };
}
