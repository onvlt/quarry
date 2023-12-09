<script lang="ts">
  import type { Doc } from "../types";
  import NavItem from "../ui/NavItem.svelte";
  import NavList from "../ui/NavList.svelte";
  import SegmentView from "./SegmentView.svelte";

  export let doc: Doc;
</script>

<NavList>
  {#each doc.segments as segment}
    <NavItem>
      <SegmentView {doc} {segment} />
    </NavItem>
  {/each}
</NavList>
