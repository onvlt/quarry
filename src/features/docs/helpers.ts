import type { Doc, DocState, FlattenedSpan } from "./types";
import type { SegmentKey, TextRange } from "../segments/types";

function createFlattenedSpan(
  doc: Doc,
  range: TextRange,
  {
    segments = new Set(),
    selected = "none",
  }: { segments?: Set<SegmentKey>; selected?: "mid" | "last" | "none" } = {}
): FlattenedSpan {
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
export function toFlattenedSpans(state: DocState): Array<FlattenedSpan> {
  type LoopState = {
    selected: boolean;
    segments: Set<SegmentKey>;
  };
  let spans: Array<FlattenedSpan> = [];
  let lastIndex = 0;
  let currentState: LoopState = {
    selected: false,
    segments: new Set(),
  };

  for (let index = 0; index < state.doc.content.length; index++) {
    let didChange = false;
    let nextState: Partial<LoopState> = {};

    if (state.selectionRange) {
      const [selectionStart, selectionEnd] = state.selectionRange;
      if (index === selectionStart) {
        nextState.selected = true;
        didChange = true;
      }
      if (index === selectionEnd) {
        nextState.selected = false;
        didChange = true;
      }
    }

    for (let [segmentKey, segment] of state.doc.segments) {
      const [segmentStart, segmentEnd] = segment.range;
      if (index === segmentStart) {
        nextState.segments = new Set(currentState.segments);
        nextState.segments.add(segmentKey);
        didChange = true;
      }
      if (index === segmentEnd) {
        nextState.segments = new Set(currentState.segments);
        nextState.segments.delete(segmentKey);
        didChange = true;
      }
    }

    if (didChange) {
      spans.push(
        createFlattenedSpan(state.doc, [lastIndex, index], {
          segments: currentState.segments,
          selected: currentState.selected
            ? nextState.selected
              ? "mid"
              : "last"
            : "none",
        })
      );
      currentState = {
        selected: nextState.selected ?? currentState.selected,
        segments: nextState.segments ?? currentState.segments,
      };
      console.log(currentState);
      lastIndex = index;
    }
  }
  if (lastIndex !== state.doc.content.length - 1) {
    spans.push(
      createFlattenedSpan(state.doc, [lastIndex, state.doc.content.length - 1])
    );
  }

  return spans;
}
