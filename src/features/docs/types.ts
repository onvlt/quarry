import type { Segment } from "../segments/types";

export type DocId = number;

export interface Doc {
  id: DocId;
  title: string;
  content: string;
  segments: Array<Segment>;
}
