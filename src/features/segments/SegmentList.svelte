<script lang="ts">
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import SegmentView from "./SegmentView.svelte";
  import { docState } from "../docs/store";
  import type { Segment } from "./types";

  $: doc = $docState!.doc;

  function selectSegment(segment: Segment) {
    docState.toNormalMode(segment);
  }
</script>

<NavList>
  {#each doc.segments as segment}
    <NavItem
      on:click={() => selectSegment(segment)}
      active={$docState?.selectedSegment === segment}
    >
      <SegmentView {doc} {segment} />
    </NavItem>
  {/each}
</NavList>
