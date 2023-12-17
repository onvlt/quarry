import type { DocState, Span } from "./types";
import type { TextRange } from "../segments/types";

export function toSpans(state: DocState) {
  const bounds: Set<number> = new Set([state.doc.content.length - 1]);

  for (const [, segment] of state.doc.segments) {
    for (const index of segment.range) {
      bounds.add(index);
    }
  }

  if (state.selectionRange) {
    for (const index of state.selectionRange) {
      bounds.add(index);
    }
  }

  const segmentsArray = Array.from(state.doc.segments);
  const sortedBounds = Array.from(bounds).sort((a, b) => a - b);
  const spans: Array<Span> = [];
  let lastIndex = 0;

  for (const index of sortedBounds) {
    const range: TextRange = [lastIndex, index];
    const segments = segmentsArray
      .filter(
        ([, segment]) =>
          segment.range[0] <= range[0] && segment.range[1] >= range[1]
      )
      .map(([key]) => key);

    spans.push({
      range,
      segments: new Set(segments),
    });
    lastIndex = index;
  }

  return spans;
}
