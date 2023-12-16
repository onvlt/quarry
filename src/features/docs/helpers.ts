import type { Doc, DocState, FlattenedSpan } from "./types";
import type { Segment, TextRange } from "../segments/types";

function createFlattenedSpan(
  doc: Doc,
  range: TextRange,
  {
    segments = [],
    selected = "none",
  }: { segments?: Array<Segment>; selected?: "mid" | "last" | "none" } = {}
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
    segments: Set<Segment>;
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

    if (state.workingSegment) {
      const [selectionStart, selectionEnd] = state.workingSegment.range;
      if (index === selectionStart) {
        nextState.selected = true;
        didChange = true;
      }
      if (index === selectionEnd) {
        nextState.selected = false;
        didChange = true;
      }
    }

    for (let segment of state.doc.segments) {
      const [segmentStart, segmentEnd] = segment.range;
      if (index === segmentStart) {
        nextState.segments = new Set(currentState.segments);
        nextState.segments.add(segment);
        didChange = true;
      }
      if (index === segmentEnd) {
        nextState.segments = new Set(currentState.segments);
        nextState.segments.delete(segment);
        didChange = true;
      }
    }

    if (didChange) {
      spans.push(
        createFlattenedSpan(state.doc, [lastIndex, index], {
          segments: Array.from(currentState.segments),
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
