import type { Doc } from "./types";
import type { TextRange } from "../segments/types";

interface Span {
  range: TextRange;
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
      const [start, end] = segment.range;
      const segmentId = doc.segments.indexOf(segment);
      if (index === start) {
        spans.push({
          range: [lastIndex, start],
          segments: Array.from(currentSegments),
        });
        currentSegments.add(segmentId);
        lastIndex = start;
      }
      if (index === end) {
        spans.push({
          range: [lastIndex, end],
          segments: Array.from(currentSegments),
        });
        currentSegments.delete(segmentId);
        lastIndex = end;
      }
    }
  }
  if (lastIndex !== doc.content.length - 1) {
    spans.push({
      range: [lastIndex, doc.content.length - 1],
      segments: [],
    });
  }
  return spans;
}

export function toHtml(doc: Doc): string {
  let string = "";

  for (let span of toSpans(doc)) {
    const content = doc.content.substring(...span.range);
    if (span.segments.length > 0) {
      string += `<span
        class="segment"
        data-segments="${JSON.stringify(span.segments)}"
      >${content}</span>`;
    } else {
      string += content;
    }
  }

  return string;
}
