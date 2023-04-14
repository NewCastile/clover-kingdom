import { HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { CSSProperties, useState } from "react";

import TruncatedText from "../TruncatedText";
import ChapterList from "../Chapter/ChapterList";
import { MangaArc } from "../../types";

import ArcButton from "./Button";

export default function ArcContainer({ title, synopsis, chapters }: MangaArc) {
  const [toggleChapters, setToggleChapters] = useState<boolean>(false);

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
