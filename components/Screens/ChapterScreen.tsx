import { Box, Stack, Text } from "@chakra-ui/react";

import ChapterProvider from "../Chapter/ChapterViewer/ChapterViewerContext/Provider";
import ChapterViewer from "../Chapter/ChapterViewer";
import { RawMangaChapter } from "../../types";

interface ChapterScreenProps {
  number: RawMangaChapter["number"];
  pages: RawMangaChapter["pages"];
  page: number;
  manga: string;
}

export default function ChapterScreen({ number, pages, page, manga }: ChapterScreenProps) {
  return (
    <ChapterProvider {...{ chapter: number, pages, page, manga }}>
      <Stack
        alignItems="center"
        direction={"column"}
        height="100%"
        justifyContent={"center"}
        width={"100%"}
      >
        <Text
          backgroundColor={"pastel-black"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          mb={"1rem"}
          py={"1rem"}
          textAlign={"center"}
          width={"100%"}
        >
          Capítulo #{number}
        </Text>
        <ChapterViewer />
        <Box className="spacer" height={"2em"} />
      </Stack>
    </ChapterProvider>
  );
}
