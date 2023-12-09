<script lang="ts">
  import { tags } from "../store";
  import type { Doc, Segment, Tag, TagId } from "../types";
  import TagBadge from "./TagBadge.svelte";
  export let doc: Doc;
  export let segment: Segment;

  const text = doc.content.substring(segment.span[0], segment.span[1]);

  function findTag(id: TagId): Tag {
    const tag = $tags.find((tag) => tag.id === id);
    if (!tag) {
      throw Error("Tag not found");
    }
    return tag;
  }
</script>

<li>
  <p class="content">{text}</p>
  <ul class="tag-list">
    {#each segment.tags as tagId}
      <li>
        <TagBadge tag={findTag(tagId)} />
      </li>
    {/each}
  </ul>
</li>

<style>
  .content {
    margin-bottom: 0.25em;
  }

  .tag-list {
    display: flex;
    gap: 0.25rem;
  }
</style>
