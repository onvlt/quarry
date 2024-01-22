import { writable } from "svelte/store";
import type { Doc, DocState } from "./types";
import type { Segment, SegmentId, TextRange } from "../segments/types";
import { _tags } from "../tags/store";
import type { Tag } from "../tags/types";
import { segmentIdFromRange } from "../segments/helpers";

function createDocStore() {
  const { subscribe, set, update } = writable<DocState | null>(null);

  function openDoc(doc: Doc) {
    set({
      doc,
      hoveredSegmentId: null,
      mode: "normal",
    });
  }

  function createSegment(range: TextRange) {
    update((state) => {
      if (!state) {
        return null;
      }

      // If selection is empty, do nothing.
      if (range.start === range.end) {
        return state;
      }

      const segmentId = segmentIdFromRange(range);
      const segment = state.doc.segments.get(segmentId) ?? {
        range,
        tags: new Set(),
      };
      state.doc.segments.set(segmentId, segment);

      return {
        ...state,
        mode: "selection",
        selectedSegment: segment,
        selectedSegmentId: segmentIdFromRange(range),
      };
    });
  }

  function selectSegment(segment: Segment) {
    update((state) => {
      if (!state) {
        return null;
      }

      return {
        ...state,
        mode: "selection",
        selectedSegment: segment,
        selectedSegmentId: segmentIdFromRange(segment.range),
      };
    });
  }

  function unselectSegment() {
    update((state) => {
      if (!state) {
        return null;
      }

      return {
        ...state,
        mode: "normal",
      };
    });
  }

  function deleteSegment() {
    update((state) => {
      if (state && state.mode === "selection") {
        state.doc.segments.delete(state.selectedSegmentId);

        return {
          ...state,
          mode: "normal",
        };
      }

      return state;
    });
  }

  function toggleTag(tag: Tag) {
    update((state) => {
      if (state && state.mode === "selection") {
        const segment = state.doc.segments.get(state.selectedSegmentId);

        if (!segment) {
          return state;
        }

        if (segment.tags.has(tag)) {
          segment.tags.delete(tag);
        } else {
          segment.tags.add(tag);
        }
      }

      return state;
    });
  }

  return {
    set,
    subscribe,
    openDoc,
    createSegment,
    selectSegment,
    unselectSegment,
    deleteSegment,
    toggleTag,
  };
}

export const docState = createDocStore();

export const docs = writable<Array<Doc>>([
  {
    id: 1,
    title: "Bubny-zátory",
    content: `Přijeli jsme na Vltavskou, je nás asi 20. Jdeme kousek dál od zastávky směrem k brownfieldu, abychom nepřitahovali moc pozornosti. Rozcházíme se někdy kolem 14:00. Michal nám dává instrukce ať se příliš neshlukujeme. Ukazuje nám mapu, na které jsou křížky vyznačena místa rozchodu a srazu.

Celý areál je obehnaný plotem nebo zátarasami s nápisy stavebních společností, nebo developerů. Ploty jsou zpravidla neprůhledné, není dovnitř snadno vidět, jen lze místy občas prohlédnout škvírami mezi díly plotu.Plechový plot je starý, pomačkaný, zrezivělý a místy opatřený ostnatým drátem.

It feels illegal here. Jak se tu pohybuyju kolem s foťákem a snažím si všechno fotit, opět cítím ten policejní pocit. Tentokrát je to není jako v minulém terénu, kde jsem si připadal, že špehuju místní. Tady si připadám jako agent, který zkoumá střeženou a zabezpečenou zónu, a nějakou ochrankou bych mohl být shledán jako vetřelec. Zabezpečenost místa se manifestuje přes zábrany, bezpečnostní prvky, cedule „zákaz vstupu“ nebo „soukromý pozemek“, zátarasy, ostnaté dráty.

Zároveň místo vypadá opuštěně, ochranné prvky jsou jakoby naoko, ale překonat by je bylo velice snadné. Komu se snaží zabránit vstupu? Zlodějům? Zvědavcům? Etnografům?

Mezi silnicí a plotem je akorát parkoviště – osvědčený způsob využívání nezastavěných brownfieldů.

První legitimní cesta do areálu je z Bubenské, je tam vjezd chráněný závorou a kamerou, v přistavené buňce sedí vrátný. Setkávám se tu s pár lidma a máme obavu, jestli se může dovnitř. Zároveň za vstupem vidíme budovu nádraží, která zřejmě slouží jako památník holokaustu, tak tam k ní snad musí být veřejný přístup. Kolegyně se ptá vrátného, jestli tam mají otevřeno, on že „neví“ a pouští nás do areálu. Uvnitř se nachází přístupná plocha, která je neurčitě vymezená pro veřejný přístup a ohraničená plotem, který je vymezený pro stavaře. Na této ploše se nachází stará nádražní budova s nápisem Praha-Bubny. Její fasáda je oprýskaná a zašlá.

V budově sídlí organizace Památník ticha, „paměťová instituce“ s cílem pěstovat paměť holokaustu. Jejím projektem je z nádraží učinit památník holokaustu. Historicky tato budova sloužila jako místo, odkud byli vypravováni židé do koncentráků. Organizace uzavřela v roce 2021 smlouvu se Správou železnic o zapůjčení nádraží na tento projekt na 99 let. Spolu s tím stránka odhaluje vizualizaci developmentu nadrážní budovy a bezprostřeního okolí (wow tolik betonu, tam to bude v lětě děsně rozpálený)
`,
    segments: new Map([
      [`50-520`, { range: { start: 50, end: 520 }, tags: new Set([_tags[0]]) }],
      [
        `321-800`,
        { range: { start: 321, end: 800 }, tags: new Set([_tags[1]]) },
      ],
      [
        `500-600`,
        {
          range: { start: 500, end: 600 },
          tags: new Set([_tags[0], _tags[1]]),
        },
      ],
    ]),
  },
]);
