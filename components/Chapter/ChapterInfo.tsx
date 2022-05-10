import { Button, Grid, GridItem, Link as ChakraLink, Spinner } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext, useState } from "react";
import axios from "axios";
import FileSaver from "file-saver";

import { MangaChapterInfo, RawMangaChapter } from "../../types";
import { MangaContext } from "../../pages/[manga]";
import HeroDownloadIcon from "../Icons/DownloadIcon";

export default function ChapterInfo({ number, title, numberOfPages }: MangaChapterInfo) {
  const { name: mangaTitle, downloadable } = useContext(MangaContext);
  const [download, setDownload] = useState<"onGoing" | "idle">("idle");

  const downloadButtonOnClickHandler = async () => {
    setDownload("onGoing");
    const { chapter } = await axios
      .get<{ chapter: RawMangaChapter }>(`api/${mangaTitle}/${number}`)
      .then((res) => res.data);

    try {
      const { message, zipUrl } = await axios
        .post<{ zipUrl: string; message: string }>("api/zip/download", {
          manga: mangaTitle,
          entrie: chapter,
        })
        .then((res) => res.data);

      console.log(message);
      await fetch(zipUrl).then(async (res) => {
        const blob = await res.blob();

        if (blob.type === "application/zip") {
          FileSaver.saveAs(blob, `${mangaTitle} - Capítulo #${chapter.number}`);
        } else {
          throw new Error("No zip file for this chapter was found");
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setDownload("idle");
    }
  };

  return (
    <Grid
      columnGap={"15px"}
      templateColumns={{ base: "5ch auto 4ch", md: "1fr 15fr 2fr 1fr" }}
      width={"100%"}
    >
      <GridItem alignItems={"center"} display={"flex"} fontWeight={"bold"} textAlign={"justify"}>
        {number}
      </GridItem>
      <GridItem alignItems={"center"} display={"flex"} textAlign={"start"}>
        <NextLink href={`${mangaTitle}/chapter/${number}/1`}>
          <ChakraLink textDecoration={"underline"}>{title || "Leer"}</ChakraLink>
        </NextLink>
      </GridItem>
      <GridItem alignItems={"center"} display={{ base: "none", xl: "flex" }} textAlign={"justify"}>
        Páginas: {numberOfPages}
      </GridItem>
      {downloadable && (
        <GridItem alignItems={"center"} display={{ base: "none", md: "flex" }} textAlign={"right"}>
          <Button disabled={download === "onGoing"} onClick={downloadButtonOnClickHandler}>
            {download === "onGoing" ? (
              <Spinner size={"sm"} thickness={"4px"} />
            ) : (
              <HeroDownloadIcon />
            )}
          </Button>
        </GridItem>
      )}
    </Grid>
  );
}
