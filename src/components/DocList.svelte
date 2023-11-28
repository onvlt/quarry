<script lang="ts">
  import { docs, selectedDoc } from "../store";
  import type { Doc } from "../types";

  function onClick(event: Event, doc: Doc) {
    event.preventDefault();
    $selectedDoc = doc;
  }
</script>

<ul>
  {#each $docs as doc}
    <li>
      <a on:click={(event) => onClick(event, doc)}>{doc.title}</a>
    </li>
  {/each}
</ul>
