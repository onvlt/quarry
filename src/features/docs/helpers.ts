import type { Doc, DocState } from "./types";
import type { TextRange } from "../segments/types";

interface FlattenedSpan {
  range: TextRange;
  content: string;
  segments: Array<number>;
  selected: "mid" | "last" | "none";
}

function createFlattenedSpan(
  doc: Doc,
  range: TextRange,
  {
    segments = [],
    selected = "none",
  }: { segments?: Array<number>; selected?: "mid" | "last" | "none" } = {}
) {
  return {
    range,
    content: doc.content.substring(...range),
    segments,
    selected,
  };
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
      spans.push(
        createFlattenedSpan(doc, [lastIndex, index], {
          segments: Array.from(currentState.segments),
          selected: currentState.selected
            ? nextState.selected
              ? "mid"
              : "last"
            : "none",
        })
      );
      currentState = nextState;
      lastIndex = index;
    }
  }
  if (lastIndex !== doc.content.length - 1) {
    spans.push(createFlattenedSpan(doc, [lastIndex, doc.content.length - 1]));
  }

  return spans;
}
