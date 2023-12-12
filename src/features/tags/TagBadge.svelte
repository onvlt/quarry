<script lang="ts">
  import type { Tag } from "./types";

  export let tag: Tag;
</script>

<span class="badge">
  <svg viewBox="0 0 2 2" width="8">
    <circle cx="1" cy="1" r="1" fill={tag.color} />
  </svg>
  {tag.name}
</span>

<style>
  .badge {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    font-size: var(--font-size-xs);
    background-color: var(--gray-3);
    border-radius: 0.5em;
    padding: 0 0.75em;
    font-weight: 500;
  }
</style>
