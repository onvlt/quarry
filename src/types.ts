export interface Doc {
  title: string;
  content: string;
  segments: Array<Segment>;
}

type TagId = number;

export interface Segment {
  span: [start: number, end: number];
  tags: Array<TagId>;
}

export interface Tag {
  id: TagId;
  name: string;
  color?: string;
}
