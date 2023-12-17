import type { SegmentKey, Segments, TextRange } from "../segments/types";

export type DocId = number;

export interface Doc {
  id: DocId;
  title: string;
  content: string;
  segments: Segments;
}

export type DocMode = "normal" | "selection";

export interface DocState {
  mode: DocMode;
  doc: Doc;
  selectionRange: TextRange | null;
  selectedSegmentKey: SegmentKey | null;
}

export interface FlattenedSpan {
  range: TextRange;
  content: string;
  segments: Set<SegmentKey>;
  selected: "mid" | "last" | "none";
}
