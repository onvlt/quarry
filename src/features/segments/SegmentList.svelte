<script lang="ts">
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import SegmentView from "./SegmentView.svelte";
  import type { Doc } from "../docs/types";
  import { docState, toNormalMode } from "../docs/store";
  import type { Segment } from "./types";

  export let doc: Doc;

  function selectSegment(segment: Segment) {
    if ($docState) {
      $docState = {
        ...toNormalMode($docState),
        selectedSegment: segment,
      };
    }
  }
</script>

<NavList>
  {#each doc.segments as segment}
    <NavItem
      on:click={() => selectSegment(segment)}
      active={$docState.selectedSegment === segment}
    >
      <SegmentView {doc} {segment} />
    </NavItem>
  {/each}
</NavList>
