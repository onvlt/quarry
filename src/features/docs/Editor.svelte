<script lang="ts">
  import { onMount } from "svelte";
  import { EditorView } from "codemirror";

  export let content: string;
  let editor: EditorView;
  let element: Element;

  onMount(() => {
    editor = new EditorView({
      parent: element,
      doc: content,
      extensions: [
        EditorView.lineWrapping,
        EditorView.updateListener.of((event) => {
          // TODO: do something
          console.log(event.state.doc.toString());
        }),
      ],
    });
  });

  // $: {
  //   const transaction = editor.state.update({
  //     changes: {
  //       from: 0,
  //       insert: content,
  //     },
  //   });

  //   editor.dispatch(transaction);
  // }
</script>

<div class="codemirror" bind:this={element} />

<style>
  .codemirror {
    padding: 1rem;
  }
</style>
