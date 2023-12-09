<script lang="ts">
  import { tags } from "../store";
  import NavItem from "../ui/NavItem.svelte";
  import NavList from "../ui/NavList.svelte";
</script>

<NavList>
  {#each $tags as tag}
    <NavItem>
      <span class="tag-content">
        <svg viewBox="0 0 2 2" width="12">
          <circle cx="1" cy="1" r="1" fill={tag.color} />
        </svg>
        {tag.name}
      </span>
    </NavItem>
  {/each}
</NavList>

<style>
  .tag-content {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
