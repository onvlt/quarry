<script lang="ts">
  import { selectedDoc } from "../store";
  import NavItem from "../ui/NavItem.svelte";
  import NavList from "../ui/NavList.svelte";
  import SegmentView from "./SegmentView.svelte";
</script>

{#if $selectedDoc !== null}
  <NavList>
    {#each $selectedDoc.segments as segment}
      <NavItem>
        <SegmentView {segment} doc={$selectedDoc} />
      </NavItem>
    {/each}
  </NavList>
{/if}
