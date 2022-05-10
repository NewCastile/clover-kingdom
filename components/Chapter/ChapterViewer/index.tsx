import { Stack, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";

import { ChapterContext } from "./ChapterViewerContext/Provider";
import ViewerImage from "./ChapterViewerLib/ViewerImage";
import ViewerDirectioners from "./ChapterViewerLib/ViewerDirectioners";

export default function ChapterViewer() {
  const { state } = useContext(ChapterContext);
  const { chapter, manga } = state;

  return (
    <>
      <ViewerDirectioners />
      <Stack
        alignItems={"center"}
        direction={"row"}
        height={"100%"}
        justifyContent={"center"}
        minHeight={"60vh"}
        position={"relative"}
        spacing={"0"}
        width={"100%"}
      >
        <ViewerImage />
      </Stack>
      <ViewerDirectioners />
      <Stack
        alignItems={"center"}
        direction={{ base: "column", sm: "row" }}
        justifyContent={"center"}
        spacing={{ base: "0.5rem", sm: "1.5rem" }}
        width={{ base: "100%", sm: "max-content" }}
      >
        <NextLink passHref href={`/${manga}/chapter/${chapter - 1}/1`}>
          <ChakraLink fontWeight={"bold"} textDecoration={"underline"}>
            Capítulo Anterior
          </ChakraLink>
        </NextLink>
        <NextLink passHref href={`/${manga}/chapter/${chapter + 1}/1`}>
          <ChakraLink fontWeight={"bold"} textDecoration={"underline"}>
            Capítulo Siguiente
          </ChakraLink>
        </NextLink>
      </Stack>
      <NextLink passHref href={`/${manga}`}>
        <ChakraLink fontWeight={"bold"} textDecoration={"underline"}>
          Página principal
        </ChakraLink>
      </NextLink>
    </>
  );
}
