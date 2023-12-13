import type { Segment, TextRange } from "../segments/types";

export type DocId = number;

export interface Doc {
  id: DocId;
  title: string;
  content: string;
  segments: Array<Segment>;
}

export type DocMode = "normal" | "tagging";

export interface DocState {
  mode: DocMode;
  selectedRange: TextRange | null;
}
