import type { Doc, DocState } from "./types";
import type { TextRange } from "../segments/types";

interface FlattenedSpan {
  range: TextRange;
  segments: Array<number>;
  selected: boolean;
}

/**
 * Convert array of possibly overlapping segments into array of non-overlapping
 * "spans", which can be easily expressed as HTML spans.
 */
export function toFlattenedSpans(
  doc: Doc,
  state: DocState
): Array<FlattenedSpan> {
  type LoopState = {
    selected: boolean;
    segments: Set<number>;
  };
  let spans: Array<FlattenedSpan> = [];
  let lastIndex = 0;
  let currentState: LoopState = {
    selected: false,
    segments: new Set(),
  };

  for (let index = 0; index < doc.content.length; index++) {
    let nextState: LoopState | null = null;

    if (state.selectedRange) {
      const [selectionStart, selectionEnd] = state.selectedRange;
      if (index === selectionStart) {
        nextState = {
          ...currentState,
          selected: true,
        };
      }
      if (index === selectionEnd) {
        nextState = {
          ...currentState,
          selected: false,
        };
      }
    }

    for (let segment of doc.segments) {
      const [segmentStart, segmentEnd] = segment.range;
      if (index === segmentStart) {
        const segments = new Set(currentState.segments);
        segments.add(segment.id);
        nextState = {
          ...currentState,
          segments,
        };
      }
      if (index === segmentEnd) {
        const segments = new Set(currentState.segments);
        segments.delete(segment.id);
        nextState = {
          ...currentState,
          segments,
        };
      }
    }

    if (nextState) {
      spans.push({
        range: [lastIndex, index],
        segments: Array.from(currentState.segments),
        selected: currentState.selected,
      });
      currentState = nextState;
      lastIndex = index;
    }
  }
  if (lastIndex !== doc.content.length - 1) {
    spans.push({
      range: [lastIndex, doc.content.length - 1],
      segments: [],
      selected: false,
    });
  }

  return spans;
}

export function toHtml(doc: Doc, state: DocState): string {
  let string = "";

  for (let span of toFlattenedSpans(doc, state)) {
    const content = doc.content.substring(...span.range);
    const classes = [
      "range",
      span.segments.length > 0 ? "segment" : undefined,
      span.selected ? "selected" : undefined,
    ]
      .filter((x) => x)
      .join(" ");
    string += `<span class="${classes}" data-start=${span.range[0]} data-end=${span.range[1]}>${content}</span>`;
  }

  return string;
}
