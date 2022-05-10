import { Button, HStack, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { CSSProperties, useContext, useState } from "react";
import axios from "axios";
import FileSaver from "file-saver";

import TruncatedText from "../TruncatedText";
import ChapterList from "../Chapter/ChapterList";
import { MangaContext } from "../../pages/[manga]";
import { MangaArc, RawMangaChapter } from "../../types";
import HeroDownloadIcon from "../Icons/DownloadIcon";

import ArcButton from "./Button";

export default function ArcContainer({ title, synopsis, chapters }: MangaArc) {
  const { name: mangaTitle, downloadable } = useContext(MangaContext);
  const [toggleChapters, setToggleChapters] = useState<boolean>(false);
  const [download, setDownload] = useState<"onGoing" | "idle">("idle");

  const downloadArcButtonOnClickHandler = async () => {
    setDownload("onGoing");
    try {
      const rawMangaChapters = await Promise.all(
        chapters.map(async (chapter) => {
          return axios
            .get<{ chapter: RawMangaChapter }>(`api/${mangaTitle}/${chapter.number}`)
            .then((res) => res.data.chapter);
        }),
      );
      const { message, zipUrl } = await axios
        .post<{ message: string; zipUrl: string }>(`api/zip/download`, {
          manga: mangaTitle,
          entrie: rawMangaChapters,
        })
        .then((res) => res.data);

      console.log(message);
      const blob = await fetch(zipUrl).then((res) => res.blob());

      FileSaver.saveAs(blob, `${mangaTitle} - ${title}`);
    } catch (error) {
      console.error(error);
    } finally {
      setDownload("idle");
    }
  };

  return (
    <>
      <Stack bgColor={"pastel-black"} spacing={"1.5rem"} style={ContainerStyles}>
        <Text fontWeight={"bold"} textAlign={"justify"}>
          {title}
        </Text>
        <VStack width={{ base: "100%", xl: "50%" }}>
          <TruncatedText align={"justify"} truncatedLines={10}>
            {synopsis}
          </TruncatedText>
        </VStack>
        <HStack justify={"space-between"} w={"100%"}>
          <ArcButton handler={() => setToggleChapters((old) => !old)} toggled={toggleChapters}>
            <Text as={"span"} display={{ base: "none", sm: "inline" }} pl={"0.5rem"}>
              Capítulos : {chapters.length}
            </Text>
          </ArcButton>
          {downloadable && (
            <Button disabled={download === "onGoing"} onClick={downloadArcButtonOnClickHandler}>
              {download === "onGoing" ? (
                <Spinner size={"sm"} thickness={"4px"} />
              ) : (
                <HeroDownloadIcon />
              )}
            </Button>
          )}
        </HStack>
      </Stack>

      {toggleChapters ? (
        <ChapterList chapters={chapters} toggled={toggleChapters} />
      ) : (
        <ChapterList chapters={[chapters[chapters.length - 1]]} toggled={toggleChapters} />
      )}
    </>
  );
}

const ContainerStyles: CSSProperties = {
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  padding: "3rem",
  paddingBottom: "2rem",
  alignItems: "flex-start",
  borderTopRightRadius: "2rem",
  borderTopLeftRadius: "2rem",
};
