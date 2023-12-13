<script lang="ts">
  import NavList from "../../ui/NavList.svelte";
  import TagListItem from "./TagListItem.svelte";
  import type { Tag } from "./types";

  export let tags: Array<Tag>;
</script>

<NavList>
  {#each tags as tag}
    <TagListItem {tag} />
  {/each}
</NavList>
