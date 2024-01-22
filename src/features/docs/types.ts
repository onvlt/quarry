import type {
  Segment,
  SegmentId,
  Segments,
  TextRange,
} from "../segments/types";

export type DocId = number;

export interface Doc {
  id: DocId;
  title: string;
  content: string;
  segments: Segments;
}

type SharedDocState = {
  doc: Doc;
  hoveredSegmentId: SegmentId | null;
};

type ModalDocState =
  | {
      mode: "normal";
    }
  | {
      mode: "selection";
      selectedSegment: Segment;
      selectedSegmentId: SegmentId;
    };

export type DocState = SharedDocState & ModalDocState;

export interface Span {
  range: TextRange;
  segments: Set<SegmentId>;
}
