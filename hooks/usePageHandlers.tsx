import { useRouter } from "next/router";
import { useContext } from "react";

import { ChapterContext } from "../components/Chapter/ChapterViewer/ChapterViewerContext/Provider";

export default function usePageHandlers() {
  const router = useRouter();
  const {
    state: { chapter, pages, page, manga },
    dispatcher,
  } = useContext(ChapterContext);

  const nextButtonhandler = () => {
    if (page === pages.length) {
      return;
    }
    router.replace(`/${manga}/chapter/${chapter}/${page + 1}`, undefined, {
      shallow: true,
    });
    dispatcher({ type: "NEXT_PAGE" });
  };

  const prevButtonHandler = () => {
    if (page === 1) {
      return;
    }
    router.replace(`/${manga}/chapter/${chapter}/${page - 1}`, undefined, {
      shallow: true,
    });
    dispatcher({ type: "PREV_PAGE" });
  };

  const selectPageHandler = (selectedPage: number) => {
    router.replace(`/${manga}/chapter/${chapter}/${selectedPage}`, undefined, {
      shallow: true,
    });
    dispatcher({ type: "SELECT_PAGE", payload: { pageNumber: selectedPage } });
  };

  return [nextButtonhandler, prevButtonHandler, selectPageHandler] as const;
}
