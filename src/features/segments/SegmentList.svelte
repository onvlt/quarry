<script lang="ts">
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import SegmentView from "./SegmentView.svelte";
  import type { Doc } from "../docs/types";

  export let doc: Doc;
</script>

<NavList>
  {#each doc.segments as segment}
    <NavItem>
      <SegmentView {doc} {segment} />
    </NavItem>
  {/each}
</NavList>
