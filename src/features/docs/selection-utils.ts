import { rangeFromTuple } from "../segments/helpers";
import type { TextRange } from "../segments/types";

export function textRangeFromSelection(
  selection: Selection,
  container: HTMLElement
): TextRange | null {
  if (
    container.contains(selection.anchorNode) &&
    container.contains(selection.focusNode)
  ) {
    if (
      selection.anchorNode?.parentElement instanceof HTMLSpanElement &&
      selection.focusNode?.parentElement instanceof HTMLSpanElement
    ) {
      const anchorSpanOffset = Number(
        selection.anchorNode.parentElement.dataset.start
      );
      const focusSpanOffset = Number(
        selection.focusNode.parentElement.dataset.start
      );

      const selectionRange = rangeFromTuple([
        selection.anchorOffset + anchorSpanOffset,
        selection.focusOffset + focusSpanOffset,
      ]);

      return selectionRange;
    }
  }
  return null;
}
