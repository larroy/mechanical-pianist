// The library: the pieces that come with the app. Originals are composed in
// code (demoPiece.ts); the others are MIDI performances bundled into the app
// itself (inlined at build time, so nothing has to be fetched).
import { composeEtudes, composeNocturne, composePhrase, midiBytes } from '../interpretation/demoPiece';
import nocturneOp9 from '../music/chopin-nocturne-op9-2.mid?inline';
import raindrop from '../music/chopin-raindrop-prelude.mid?inline';
import gnossienne from '../music/satie-gnossienne-1.mid?inline';
import mapleLeaf from '../music/joplin-maple-leaf-rag.mid?inline';
import gv00 from '../music/Gould_Bach_GV_01_Aria.mid?inline';
import gv01 from '../music/Gould_Bach_GV_02_Var1.mid?inline';
import gv02 from '../music/Gould_Bach_GV_03_Var2.mid?inline';
import gv03 from '../music/Gould_Bach_GV_04_Var3.mid?inline';
import gv04 from '../music/Gould_Bach_GV_05_Var4.mid?inline';
import gv05 from '../music/Gould_Bach_GV_06_Var5.mid?inline';
import gv06 from '../music/Gould_Bach_GV_07_Var6.mid?inline';
import gv07 from '../music/Gould_Bach_GV_08_Var7.mid?inline';
import gv08 from '../music/Gould_Bach_GV_09_Var8.mid?inline';
import gv09 from '../music/Gould_Bach_GV_10_Var9.mid?inline';
import gv10 from '../music/Gould_Bach_GV_11_Var10.mid?inline';
import gv11 from '../music/Gould_Bach_GV_12_Var11.mid?inline';
import gv12 from '../music/Gould_Bach_GV_13_Var12.mid?inline';
import gv13 from '../music/Gould_Bach_GV_14_Var13.mid?inline';
import gv14 from '../music/Gould_Bach_GV_15_Var14.mid?inline';
import gv15 from '../music/Gould_Bach_GV_16_Var15.mid?inline';
import gv16 from '../music/Gould_Bach_GV_17_Var16.mid?inline';
import gv17 from '../music/Gould_Bach_GV_18_Var17.mid?inline';
import gv18 from '../music/Gould_Bach_GV_19_Var18.mid?inline';
import gv19 from '../music/Gould_Bach_GV_20_Var19.mid?inline';
import gv20 from '../music/Gould_Bach_GV_21_Var20.mid?inline';
import gv21 from '../music/Gould_Bach_GV_22_Var21.mid?inline';
import gv22 from '../music/Gould_Bach_GV_23_Var22.mid?inline';
import gv23 from '../music/Gould_Bach_GV_24_Var23.mid?inline';
import gv24 from '../music/Gould_Bach_GV_25_Var24.mid?inline';
import gv25 from '../music/Gould_Bach_GV_26_Var25.mid?inline';
import gv26 from '../music/Gould_Bach_GV_27_Var26.mid?inline';
import gv27 from '../music/Gould_Bach_GV_28_Var27.mid?inline';
import gv28 from '../music/Gould_Bach_GV_29_Var28.mid?inline';
import gv29 from '../music/Gould_Bach_GV_30_Var29.mid?inline';
import extra from 'virtual:extra-music';

export type LibraryGroup = 'Original' | 'Classical' | 'Songs';

export interface LibraryEntry {
  id: string;
  title: string;
  artist: string;
  year?: string;
  group: LibraryGroup;
  blurb: string;
  bytes(): Uint8Array;
}

function fromDataUrl(url: string): () => Uint8Array {
  let cache: Uint8Array | null = null;
  return () => {
    if (cache) return cache;
    const b64 = url.slice(url.indexOf(',') + 1);
    const raw = atob(b64);
    const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return (cache = out);
  };
}

/** one piece of the Goldberg Variations, BWV 988 (n = 0 is the Aria, then Variations 1 to 29) */
function goldberg(n: number, title: string, blurb: string, data: string): LibraryEntry {
  return {
    id: n === 0 ? 'goldberg-aria' : `goldberg-var-${n}`,
    title: `Goldberg Variations, BWV 988: ${title}`,
    artist: 'Johann Sebastian Bach',
    year: '1741',
    group: 'Classical',
    blurb,
    bytes: fromDataUrl(data),
  };
}

/** the repository's own pieces: classical, then originals; each by year */
const BUILT_IN: LibraryEntry[] = [
  {
    id: 'nocturne-op9-2',
    title: 'Nocturne in E♭ major, Op. 9 No. 2',
    artist: 'Frédéric Chopin',
    year: '1832',
    group: 'Classical',
    blurb: 'The best known of the nocturnes: an ornamented, singing melody over a rocking 12/8 accompaniment.',
    bytes: fromDataUrl(nocturneOp9),
  },
  {
    id: 'raindrop',
    title: 'Prelude in D♭ major, Op. 28 No. 15 “Raindrop”',
    artist: 'Frédéric Chopin',
    year: '1839',
    group: 'Classical',
    blurb: 'The repeated A♭ falls through the whole prelude, darkening into C♯ minor and back.',
    bytes: fromDataUrl(raindrop),
  },
  {
    id: 'gnossienne',
    title: 'Gnossienne No. 1',
    artist: 'Erik Satie',
    year: '1890',
    group: 'Classical',
    blurb: 'Without bar lines, marked to be played “very lost”, over a slow, swaying bass.',
    bytes: fromDataUrl(gnossienne),
  },
  {
    id: 'maple-leaf-rag',
    title: 'Maple Leaf Rag',
    artist: 'Scott Joplin',
    year: '1899',
    group: 'Classical',
    blurb: 'The rag that made ragtime famous: syncopated right-hand figures over a striding left hand.',
    bytes: fromDataUrl(mapleLeaf),
  },
  goldberg(0, 'Aria', 'The sarabande in G major whose bass line every variation is built on.', gv00),
  goldberg(1, 'Variation 1', 'A bright two-voice piece, the right hand leaping over a walking bass.', gv01),
  goldberg(2, 'Variation 2', 'A gentle three-voice texture in which two upper lines chase each other over the bass.', gv02),
  goldberg(3, 'Variation 3', 'The first canon: the upper voices enter at the unison, over a lilting bass.', gv03),
  goldberg(4, 'Variation 4', 'A lively passepied, its imitations tumbling from voice to voice.', gv04),
  goldberg(5, 'Variation 5', 'Rapid two-voice figuration, the hands crossing and answering each other.', gv05),
  goldberg(6, 'Variation 6', 'A canon at the second: the answering voice enters a step higher.', gv06),
  goldberg(7, 'Variation 7', 'A dancing gigue rhythm, a little spring in every bar.', gv07),
  goldberg(8, 'Variation 8', 'Brilliant hand-crossing for two keyboards, with scales and leaps traded between the hands.', gv08),
  goldberg(9, 'Variation 9', 'A canon at the third, calm and singing over a steady bass.', gv09),
  goldberg(10, 'Variation 10', 'A fughetta: a short four-voice fugue on the first notes of the bass.', gv10),
  goldberg(11, 'Variation 11', 'A flowing 12/16 dance, the hands passing running figures between them.', gv11),
  goldberg(12, 'Variation 12', 'A canon at the fourth, the answering voice inverted.', gv12),
  goldberg(13, 'Variation 13', 'A slow, ornamented aria for the right hand over a quiet accompaniment.', gv13),
  goldberg(14, 'Variation 14', 'A virtuoso display of fast trills and wide leaps across the keyboard.', gv14),
  goldberg(15, 'Variation 15', 'A canon at the fifth in G minor, slow and sombre, closing the first half.', gv15),
  goldberg(16, 'Variation 16', 'A French overture: stately dotted rhythms, then a quick fugal section.', gv16),
  goldberg(17, 'Variation 17', 'A brilliant two-voice piece in running thirds and sixths.', gv17),
  goldberg(18, 'Variation 18', 'A canon at the sixth in the old style, smooth and unhurried.', gv18),
  goldberg(19, 'Variation 19', 'A light 3/8 dance of delicate imitations.', gv19),
  goldberg(20, 'Variation 20', 'Fast hand-crossing toccata passages in a bright, virtuoso style.', gv20),
  goldberg(21, 'Variation 21', 'A canon at the seventh in G minor, with a chromatic, yearning line.', gv21),
  goldberg(22, 'Variation 22', 'A four-voice alla breve in the strict old style.', gv22),
  goldberg(23, 'Variation 23', 'A joyful two-voice display of rapid scales and thirds.', gv23),
  goldberg(24, 'Variation 24', 'A canon at the octave, in a swaying pastoral 9/8.', gv24),
  goldberg(25, 'Variation 25', 'The slow chromatic lament in G minor at the heart of the work.', gv25),
  goldberg(26, 'Variation 26', 'Flowing semiquavers in 18/16 against a graceful 3/4 line.', gv26),
  goldberg(27, 'Variation 27', 'The last canon, at the ninth: two voices alone, answering each other.', gv27),
  goldberg(28, 'Variation 28', 'Shimmering trills and repeated figures weave through both hands.', gv28),
  goldberg(29, 'Variation 29', 'Heavy chords and rolling arpeggios build toward the finale.', gv29),
  {
    id: 'nocturne',
    title: 'Nocturne for Mechanical Hands',
    artist: 'The Mechanical Pianist',
    group: 'Original',
    blurb: 'Written for these hands: a slow melody over broken chords, a restless middle, a return.',
    bytes: () => midiBytes(composeNocturne()),
  },
  {
    id: 'etudes',
    title: 'Études',
    artist: 'The Mechanical Pianist',
    group: 'Original',
    blurb: 'Scales, arpeggios, chords, leaps and repeated notes: the passages the fingering is tested on.',
    bytes: () => midiBytes(composeEtudes()),
  },
  {
    id: 'phrase',
    title: 'Five-Note Phrase',
    artist: 'The Mechanical Pianist',
    group: 'Original',
    blurb: 'A, C, E, D, C. The first thing the hands ever played.',
    bytes: () => midiBytes(composePhrase()),
  },
];

/** what plays first */
/**
 * In programme order (songs, classical, originals; each group in its given
 * order), with any extra pieces built in from outside the repository
 * (tools/extra-music.cjs) in their groups.
 */
const GROUPS: LibraryGroup[] = ['Songs', 'Classical', 'Original'];
const EXTRA: LibraryEntry[] = extra.pieces.map(({ data, ...p }) => ({ ...p, bytes: fromDataUrl(data) }));
export const LIBRARY: LibraryEntry[] = [...EXTRA, ...BUILT_IN.filter((e) => !EXTRA.some((x) => x.id === e.id))]
  .map((e, i) => ({ e, i }))
  .sort((a, b) => GROUPS.indexOf(a.e.group) - GROUPS.indexOf(b.e.group) || a.i - b.i)
  .map(({ e }) => e);

export const DEFAULT_PIECE: string = extra.defaultPiece ?? 'gnossienne';

export const entryById = (id: string) => LIBRARY.find((e) => e.id === id);
