<script lang="ts">
  import { docState, docs } from "./store";
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import type { Doc } from "./types";

  function onClick(event: Event, doc: Doc) {
    event.preventDefault();
    docState.openDoc(doc);
  }
</script>

<NavList>
  {#each $docs as doc}
    <NavItem
      on:click={(event) => onClick(event, doc)}
      active={$docState?.doc.id === doc.id}
    >
      {doc.title}
    </NavItem>
  {/each}
</NavList>
