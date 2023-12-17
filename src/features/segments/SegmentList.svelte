<script lang="ts">
  import NavItem from "../../ui/NavItem.svelte";
  import NavList from "../../ui/NavList.svelte";
  import SegmentView from "./SegmentView.svelte";
  import { docState } from "../docs/store";
  import type { SegmentKey } from "./types";

  $: doc = $docState!.doc;

  function selectSegment(key: SegmentKey) {
    docState.toNormalMode(key);
  }
</script>

<NavList>
  {#each doc.segments as [key, segment]}
    <NavItem
      on:click={() => selectSegment(key)}
      active={$docState?.selectedSegmentKey === key}
    >
      <SegmentView {segment} />
    </NavItem>
  {/each}
</NavList>
