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

export type DocState =
  | {
      mode: "normal";
      doc: Doc;
    }
  | {
      mode: "selection";
      doc: Doc;
      selectedSegment: Segment;
      selectedSegmentId: SegmentId;
    };

export interface Span {
  range: TextRange;
  segments: Set<SegmentId>;
}
