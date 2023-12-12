import type { Doc } from "./types";

interface Span {
  start: number;
  end: number;
  segments: Array<number>;
}

/**
 * Convert array of possibly overlapping segments into array of non-overlapping
 * "spans", which can be easily expressed as HTML spans.
 */
export function toSpans(doc: Doc): Array<Span> {
  let spans: Array<Span> = [];
  let lastIndex = 0;
  const currentSegments = new Set<number>();

  for (let index = 0; index < doc.content.length; index++) {
    for (let segment of doc.segments) {
      const segmentIndex = doc.segments.indexOf(segment);
      if (index === segment.start) {
        spans.push({
          start: lastIndex,
          end: segment.start,
          segments: Array.from(currentSegments),
        });
        currentSegments.add(segmentIndex);
        lastIndex = segment.start;
      }
      if (index === segment.end) {
        spans.push({
          start: lastIndex,
          end: segment.end,
          segments: Array.from(currentSegments),
        });
        currentSegments.delete(segmentIndex);
        lastIndex = segment.end;
      }
    }
  }
  if (lastIndex !== doc.content.length - 1) {
    spans.push({
      start: lastIndex,
      end: doc.content.length - 1,
      segments: [],
    });
  }
  return spans;
}
