<script lang="ts">
  import DocView from "./features/docs/DocView.svelte";
  import { docState } from "./features/docs/store";
  import Sidebar from "./ui/Sidebar.svelte";
  import { platform } from "@tauri-apps/api/os";

  const platformNamePromise = platform();
</script>

{#await platformNamePromise then platformName}
  <main>
    <Sidebar offsetWindowControls={platformName === "darwin"} />
    {#if $docState}
      <DocView />
    {/if}
  </main>
{/await}

<style>
  main {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr;
    grid-template-areas: "sidebar title title" "sidebar doc segments";
    grid-template-rows: 3rem 1fr;
    height: 100vh;
  }
</style>
