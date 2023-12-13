import { writable } from "svelte/store";
import type { Doc, DocState } from "./types";
import type { TextRange } from "../segments/types";

export const selectedDoc = writable<Doc | null>(null);

export const docState = writable<DocState>({
  mode: "normal",
  selectedRange: null,
});

export function toSelectionMode(
  docState: DocState,
  selectedRange: TextRange
): DocState {
  return {
    ...docState,
    mode: "selection",
    selectedRange,
  };
}

export function toNormalMode(docState: DocState): DocState {
  return {
    ...docState,
    mode: "normal",
    selectedRange: null,
  };
}

export const docs = writable<Array<Doc>>([
  {
    id: 1,
    title: "Bubny-zátory",
    content: `Celý areál je obehnaný plotem nebo zátarasami s nápisy stavebních společností. Ploty jsou zpravidla neprůhledné, není dovnitř snadno vidět, jen lze místy občas prohlédnout škvírami mezi díly plotu. Podél bunenské vede mezi silnicí a plotem parkoviště ohrazené pletivem.

It feels illegal

První legitimní cesta do areálu je z Bubenské, je tam vjezd chráněný závorou a kamerou, v přistavené buňce sedí vrátný. Setkávám se tu s pár lidma a máme obavu, jestli se může dovnitř. Zároveň za vstupem vidíme budovu nádraží, která zřejmě slouží jako památník holokaustu, tak tam k ní snad musí být veřejný přístup. Kolegyně se ptá vrátného, jestli tam mají otevřeno, on že „neví“ a pouští nás do areálu.

Na křižovatce bubenska/strojnicka/zeleznicaru se skoro nedá přecházet, staví se tu ze všech stran, chodci jsou nuceni chodit přes silnici

Kolem mě jde parta dětí a smějí se se ceduli „chodník zde končí, přejděte na druhou stranu“ — na druhé straně žádný chodník není, je tam zátarasa s nápisem metrostav.
`,
    segments: [
      { id: 0, range: [0, 40], tags: [0] },
      { id: 1, range: [30, 50], tags: [0, 1] },
      { id: 2, range: [80, 100], tags: [1] },
    ],
  },
  {
    id: 2,
    title: "Bubny-zátory 2",
    content: `Haha Celý areál je obehnaný plotem nebo zátarasami s nápisy stavebních společností. Ploty jsou zpravidla neprůhledné, není dovnitř snadno vidět, jen lze místy občas prohlédnout škvírami mezi díly plotu. Podél bunenské vede mezi silnicí a plotem parkoviště ohrazené pletivem.

It feels illegal

První legitimní cesta do areálu je z Bubenské, je tam vjezd chráněný závorou a kamerou, v přistavené buňce sedí vrátný. Setkávám se tu s pár lidma a máme obavu, jestli se může dovnitř. Zároveň za vstupem vidíme budovu nádraží, která zřejmě slouží jako památník holokaustu, tak tam k ní snad musí být veřejný přístup. Kolegyně se ptá vrátného, jestli tam mají otevřeno, on že „neví“ a pouští nás do areálu.

Na křižovatce bubenska/strojnicka/zeleznicaru se skoro nedá přecházet, staví se tu ze všech stran, chodci jsou nuceni chodit přes silnici

Kolem mě jde parta dětí a smějí se se ceduli „chodník zde končí, přejděte na druhou stranu“ — na druhé straně žádný chodník není, je tam zátarasa s nápisem metrostav.
`,
    segments: [
      { id: 0, range: [0, 40], tags: [0] },
      { id: 1, range: [30, 50], tags: [0, 1] },
      { id: 2, range: [500, 800], tags: [1] },
    ],
  },
]);
