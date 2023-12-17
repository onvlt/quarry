<script lang="ts">
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import SegmentView from "./SegmentView.svelte";
  import { docState } from "../docs/store";
  import type { SegmentKey } from "./types";

  $: sortedSegments = Array.from($docState!.doc.segments.entries()).sort(
    ([, a], [, b]) => a.range[0] - b.range[0],
  );

  function selectSegment(key: SegmentKey) {
    docState.toNormalMode(key);
  }
</script>

<NavList>
  {#each sortedSegments as [key, segment] (key)}
    <NavItem
      on:click={() => selectSegment(key)}
      active={$docState?.selectedSegmentKey === key}
    >
      <SegmentView {segment} />
    </NavItem>
  {/each}
</NavList>
