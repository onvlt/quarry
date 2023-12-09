<script lang="ts">
  import { docs, selectedDoc } from "../store";
  import type { Doc } from "../types";
  import NavItem from "../ui/NavItem.svelte";
  import NavList from "../ui/NavList.svelte";

  function onClick(event: Event, doc: Doc) {
    event.preventDefault();
    $selectedDoc = doc;
  }
</script>

<NavList>
  {#each $docs as doc}
    <NavItem
      on:click={(event) => onClick(event, doc)}
      active={$selectedDoc?.id === doc.id}
    >
      {doc.title}
    </NavItem>
  {/each}
</NavList>
