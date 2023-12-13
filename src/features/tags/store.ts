import { writable } from "svelte/store";
import type { Tag } from "./types";

export const tags = writable<Array<Tag>>([
  { id: 0, name: "Decay", color: "red" },
  { id: 1, name: "Securitization", color: "purple" },
]);
