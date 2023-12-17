<script lang="ts">
  import { docState } from "../docs/store";
  import TagBadge from "../tags/TagBadge.svelte";
  import type { Segment } from "./types";

  export let segment: Segment;

  const text = $docState!.doc.content.substring(...segment.range);
</script>

<p>{segment.range[0]} - {segment.range[1]}</p>
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
