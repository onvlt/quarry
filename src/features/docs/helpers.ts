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
      const [segmentStart, segmentEnd] = segment.span;
      const segmentIndex = doc.segments.indexOf(segment);
      if (index === segmentStart) {
        spans.push({
          start: lastIndex,
          end: segmentStart,
          segments: Array.from(currentSegments),
        });
        currentSegments.add(segmentIndex);
        lastIndex = segmentStart;
      }
      if (index === segmentEnd) {
        spans.push({
          start: lastIndex,
          end: segmentEnd,
          segments: Array.from(currentSegments),
        });
        currentSegments.delete(segmentIndex);
        lastIndex = segmentEnd;
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
