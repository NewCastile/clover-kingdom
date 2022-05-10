import { WithId } from "mongodb";

export interface RawMangaDocument {
  name: string;
  chapters: Array<RawMangaChapter>;
}

export interface RawMangaChapter {
  number: number;
  pages: string[];
  arc?: string;
}

export interface MangaChapterInfo {
  number: number;
  numberOfPages: number;
  title?: string;
}

export interface MangaArc {
  title: string;
  synopsis: string;
  chapters: Array<MangaChapterInfo>;
}

export interface MangaInfo {
  name: string;
  description: string;
  state?: string;
  periodity?: string;
}

export interface MangaDocument extends MangaInfo {
  content: MangaArc[];
  downloadable?: boolean;
}

export interface MangaResponse {
  message: string;
  document?: WithId<MangaDocument>;
}

export interface GetChaptersResponse {
  message: string;
  mangaData?: MangaInfo;
  rawMangaChapters?: RawMangaDocument["chapters"];
}

export interface ArcListProps {
  chapters: MangaChapterInfo[];
  toggled: boolean;
}
