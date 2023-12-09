export type DocId = number;

export interface Doc {
  id: DocId;
  title: string;
  content: string;
  segments: Array<Segment>;
}

export type TagId = number;

export interface Segment {
  span: [start: number, end: number];
  tags: Array<TagId>;
}

export interface Tag {
  id: TagId;
  name: string;
  color?: string;
}
