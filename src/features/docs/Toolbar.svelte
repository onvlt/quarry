<script lang="ts">
  import { tags } from "../../store";
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import Input from "../../ui/Input.svelte";

  let search: string = "";
  let searchInput: HTMLInputElement;

  $: results = $tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase()),
  );

  export function focusSearch() {
    console.log("focus");
    searchInput.focus();
    searchInput.value = "lool";
  }
</script>

<div>
  <search>
    <Input bind:inputElement={searchInput} type="text" bind:value={search} />
  </search>
  <NavList>
    {#each results as tag}
      <NavItem>{tag.name}</NavItem>
    {/each}
  </NavList>
</div>

<style>
  search {
    margin-bottom: 0.25rem;
  }
</style>
