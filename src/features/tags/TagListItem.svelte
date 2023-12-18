<script lang="ts">
  import NavItem from "../../ui/NavItem.svelte";
  import type { Tag } from "./types";

  export let tag: Tag;
  export let focused: boolean;
</script>

<NavItem on:click {focused}>
  <span class="tag">
    <svg viewBox="0 0 2 2" width="12">
      <circle cx="1" cy="1" r="1" fill={tag.color} />
    </svg>
    {tag.name}
  </span>
</NavItem>

<style>
  .tag {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
