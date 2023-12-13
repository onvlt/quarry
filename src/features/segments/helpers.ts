import type { Doc } from "../docs/types";
import type { Tag } from "../tags/types";
import type { Segment, TextRange } from "./types";

export function createSegment(
  doc: Doc,
  range: TextRange,
  tags: Array<Tag>
): Segment {
  const lastSegment = doc.segments[doc.segments.length - 1];
  return {
    id: lastSegment.id + 1,
    range,
    tags,
  };
}
