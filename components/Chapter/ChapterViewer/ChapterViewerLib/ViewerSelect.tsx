import { Select } from "@chakra-ui/react";
import { SyntheticEvent, useContext } from "react";

import usePageHandlers from "../../../../hooks/usePageHandlers";
import { ChapterContext } from "../ChapterViewerContext/Provider";

export default function ViewerSelect() {
  const { state } = useContext(ChapterContext);
  const { page: currentPage, pages } = state;
  const [_next, _prev, handleSelectPage] = usePageHandlers();

  return (
    <Select
      bg={"pastel-black"}
      minWidth={"80px"}
      value={currentPage}
      width={"80px"}
      onChange={(e: SyntheticEvent<HTMLSelectElement>) => {
        const selectedPage = parseInt(e.currentTarget.value);

        handleSelectPage(selectedPage);
      }}
    >
      {pages.map((_, pageIdx) => {
        return (
          <option key={pageIdx} value={pageIdx + 1}>
            {pageIdx + 1}
          </option>
        );
      })}
    </Select>
  );
}
