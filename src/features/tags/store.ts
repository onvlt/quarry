import { writable } from "svelte/store";
import type { Tag } from "./types";

export const _tags: Array<Tag> = [
  { id: 0, name: "Decay", color: "red" },
  { id: 1, name: "Securitization", color: "purple" },
  { id: 2, name: "Climate", color: "green" },
  { id: 3, name: "Neoliberalism", color: "orange" },
];

export const tags = writable<Array<Tag>>(_tags);
