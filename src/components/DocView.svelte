<script lang="ts">
  import { onMount } from "svelte";
  import { selectedDoc } from "../store";
  import { EditorView, basicSetup } from "codemirror";
  import { EditorState, Transaction } from "@codemirror/state";

  onMount(() => {
    const editor = new EditorView({
      parent: document.querySelector("#doc")!,
      extensions: [
        EditorView.lineWrapping,
        EditorView.updateListener.of((event) => {
          // TODO: do something
          console.log(event.state.doc.toString());
        }),
      ],
    });

    selectedDoc.subscribe((doc) => {
      if (doc) {
        const transaction = editor.state.update({
          changes: {
            from: 0,
            insert: doc.content,
          },
        });

        editor.dispatch(transaction);
      }
    });
  });
</script>

<div class="codemirror" id="doc" />

<style>
  .codemirror {
    display: contents;
  }
</style>
