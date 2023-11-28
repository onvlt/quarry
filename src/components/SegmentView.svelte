<script lang="ts">
  import type { Doc, Segment } from "../types";
  export let doc: Doc;
  export let segment: Segment;

  const text = doc.content.substring(segment.span[0], segment.span[1]);
</script>

<li>
  <p>{text}</p>
</li>
