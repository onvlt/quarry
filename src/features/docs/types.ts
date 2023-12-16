import type { Segment, TextRange } from "../segments/types";

export type DocId = number;

export interface Doc {
  id: DocId;
  title: string;
  content: string;
  segments: Array<Segment>;
}

export type DocMode = "normal" | "selection";

export interface DocState {
  mode: DocMode;
  doc: Doc;
  selectedRange: TextRange | null;
  selectedSegment: Segment | null;
}

export interface FlattenedSpan {
  range: TextRange;
  content: string;
  segments: Array<Segment>;
  selected: "mid" | "last" | "none";
}
