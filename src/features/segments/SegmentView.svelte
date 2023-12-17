<script lang="ts">
  import { docState } from "../docs/store";
  import TagBadge from "../tags/TagBadge.svelte";
  import { rangeToTuple } from "./helpers";
  import type { Segment } from "./types";

  export let segment: Segment;

  const text = $docState!.doc.content.substring(...rangeToTuple(segment.range));
</script>

<p>{segment.range.start} - {segment.range.end}</p>
<p class="content">{text}</p>
<ul class="tag-list">
  {#each segment.tags as tag}
    <li>
      <TagBadge {tag} />
    </li>
  {/each}
</ul>

<style>
  .content {
    margin-bottom: 0.25em;
  }

  .tag-list {
    display: flex;
    gap: 0.25rem;
  }
</style>
