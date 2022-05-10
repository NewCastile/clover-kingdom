import { Dispatch, ReactNode } from "react";

export interface ChapterContextProps {
  state: ChapterState;
  dispatcher: Dispatch<ChapterAction>;
}

export interface ChapterState {
  page: number;
  pages: string[];
  chapter: number;
  manga: string;
}

export interface NewChapterAction {
  type: "NEW_CHAPTER";
  payload: ChapterState;
}

export interface ChapterNextPageAction {
  type: "NEXT_PAGE";
}

export interface ChapterPrevPageAction {
  type: "PREV_PAGE";
}

export interface ChapterSelectPageAction {
  type: "SELECT_PAGE";
  payload: {
    pageNumber: number;
  };
}

export type ChapterAction =
  | ChapterNextPageAction
  | ChapterPrevPageAction
  | ChapterSelectPageAction
  | NewChapterAction;

export interface ChapterProviderProps {
  page: number;
  pages: string[];
  chapter: number;
  manga: string;
  children: ReactNode;
}
