import { Stack } from "@chakra-ui/react";
import { CSSProperties } from "react";

import { ArcListProps } from "../../types";
import ChapterInfo from "../Chapter/ChapterInfo";

export default function ChapterList({ chapters, toggled }: ArcListProps) {
  const InstanceStyle: CSSProperties = toggled ? toggledStyles : untoggledStyles;

  return (
    <Stack className="scrollable-container" spacing={"20px"} style={InstanceStyle}>
      {chapters.map((chapter, chapterIdx) => {
        return <ChapterInfo key={chapterIdx} {...chapter} />;
      })}
    </Stack>
  );
}

const untoggledStyles: CSSProperties = {
  width: "100%",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "1rem 3rem",
};

const toggledStyles: typeof untoggledStyles = {
  ...untoggledStyles,
  height: "auto",
  maxHeight: "20rem",
  overflowY: "scroll",
};
