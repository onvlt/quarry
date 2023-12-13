<script lang="ts">
  import { tags } from "../tags/store";
  import TagBadge from "../tags/TagBadge.svelte";
  import type { Doc } from "../docs/types";
  import type { Tag, TagId } from "../tags/types";
  import type { Segment } from "./types";

  export let doc: Doc;
  export let segment: Segment;

  const text = doc.content.substring(...segment.range);
</script>

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
