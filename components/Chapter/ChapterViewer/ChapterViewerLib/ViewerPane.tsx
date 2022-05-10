import { Box } from "@chakra-ui/react";
import { CSSProperties } from "react";

import usePageHandlers from "../../../../hooks/usePageHandlers";
import { ChapterPaneProps } from "../ChapterViewer.types";

export default function ViewerPane({ direction }: ChapterPaneProps) {
  const [hanldeNextPage, handlePrevPage] = usePageHandlers();
  const InstanceStyles = { ...ChapterPaneStyles, [direction]: 0 };

  return direction === "left" ? (
    <Box
      _hover={{
        background:
          "linear-gradient(90deg, rgba(0,0,0,0.7185807428440126) 41%, rgba(255,255,255,0) 100%, rgba(255,255,255,0) 100%)",
      }}
      as={"span"}
      style={InstanceStyles}
      onClick={handlePrevPage}
    />
  ) : (
    <Box
      _hover={{
        background:
          "linear-gradient(-90deg, rgba(0,0,0,0.7185807428440126) 41%, rgba(255,255,255,0) 100%, rgba(255,255,255,0) 100%)",
      }}
      as={"span"}
      style={InstanceStyles}
      onClick={hanldeNextPage}
    />
  );
}

const ChapterPaneStyles: CSSProperties = {
  zIndex: 5,
  position: "absolute",
  width: "25%",
  height: "100%",
  backgroundColor: "rgba(30, 30, 30, 0)",
};
