import { createContext, useEffect, useReducer } from "react";

import { ChapterContextProps, ChapterProviderProps } from "./Context.types";
import ChapterReducer from "./Reducer";

export const ChapterContext = createContext<ChapterContextProps>({} as ChapterContextProps);

export default function ChapterProvider({
  page,
  pages,
  chapter,
  manga,
  children,
}: ChapterProviderProps) {
  const [chapterState, chapterDispatcher] = useReducer(ChapterReducer, {
    page,
    pages,
    chapter,
    manga,
  });

  useEffect(() => {
    chapterDispatcher({
      type: "NEW_CHAPTER",
      payload: { chapter, pages, page, manga },
    });
  }, [chapter]);

  return (
    <ChapterContext.Provider value={{ state: chapterState, dispatcher: chapterDispatcher }}>
      {children}
    </ChapterContext.Provider>
  );
}
