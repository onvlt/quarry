import type { Doc } from "../docs/types";
import type { TagId } from "../tags/types";
import type { Segment, TextRange } from "./types";

export function createSegment(
  doc: Doc,
  range: TextRange,
  tagIds: Array<TagId>
): Segment {
  const lastSegment = doc.segments[doc.segments.length - 1];
  return {
    id: lastSegment.id + 1,
    range,
    tags: tagIds,
  };
}
