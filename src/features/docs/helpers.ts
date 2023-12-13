import type { Doc, DocState, FlattenedSpan } from "./types";
import type { TextRange } from "../segments/types";
import { docState } from "./store";

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
    let didChange = false;
    let nextState: Partial<LoopState> = {};

    if (state.selectedRange) {
      const [selectionStart, selectionEnd] = state.selectedRange;
      if (index === selectionStart) {
        nextState.selected = true;
        didChange = true;
      }
      if (index === selectionEnd) {
        nextState.selected = false;
        didChange = true;
      }
    }

    for (let segment of doc.segments) {
      const [segmentStart, segmentEnd] = segment.range;
      nextState.segments = new Set(currentState.segments);
      if (index === segmentStart) {
        nextState.segments.add(segment.id);
        didChange = true;
      }
      if (index === segmentEnd) {
        nextState.segments.delete(segment.id);
        didChange = true;
      }
    }

    if (didChange) {
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
      currentState = { ...currentState, ...nextState };
      lastIndex = index;
    }
  }
  if (lastIndex !== doc.content.length - 1) {
    spans.push(createFlattenedSpan(doc, [lastIndex, doc.content.length - 1]));
  }

  return spans;
}
