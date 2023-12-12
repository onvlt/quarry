<script lang="ts">
  import { tags } from "../../store";
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";

  let search: string = "";
  let searchInput: HTMLInputElement;

  $: results = $tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase()),
  );

  export function focus() {
    console.log("focus");
    searchInput.focus();
    searchInput.value = "lool";
  }
</script>

<div>
  <search>
    <input bind:this={searchInput} type="text" bind:value={search} />
  </search>
  <NavList>
    {#each results as tag}
      <NavItem>{tag.name}</NavItem>
    {/each}
  </NavList>
</div>
