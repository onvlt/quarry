<script lang="ts">
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import SegmentView from "./SegmentView.svelte";
  import { docState } from "../docs/store";
  import type { Segment } from "./types";

  $: sortedSegments = Array.from($docState!.doc.segments.entries()).sort(
    ([, a], [, b]) => a.range.start - b.range.start,
  );

  function selectSegment(segment: Segment) {
    docState.selectSegment(segment);
  }
</script>

<NavList>
  {#each sortedSegments as [id, segment] (id)}
    <NavItem
      on:click={() => selectSegment(segment)}
      active={$docState?.mode === "selection" &&
        $docState.selectedSegmentId === id}
    >
      <SegmentView {segment} />
    </NavItem>
  {/each}
</NavList>
