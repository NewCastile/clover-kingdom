import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Stack } from "@chakra-ui/react";
import { useContext } from "react";

import usePageHandlers from "../../../../hooks/usePageHandlers";
import { ChapterContext } from "../ChapterViewerContext/Provider";

import ViewerSelect from "./ViewerSelect";

export default function ViewerDirectioners() {
  const {
    state: { pages },
  } = useContext(ChapterContext);
  const [hanldeNextPage, handlePrevPage, handleSelectPage] = usePageHandlers();

  return (
    <Stack
      alignItems={"center"}
      direction={"row"}
      fontWeight={"bold"}
      justifyContent={"center"}
      padding={"1rem"}
      width={{ base: "100%", sm: "max-content" }}
    >
      <Button width={16} onClick={() => handleSelectPage(1)}>
        <ArrowLeftIcon />
      </Button>
      <Button width={16} onClick={() => handlePrevPage()}>
        <ChevronLeftIcon h={10} w={8} />
      </Button>
      <ViewerSelect />
      <Button width={16} onClick={() => hanldeNextPage()}>
        <ChevronRightIcon h={10} w={8} />
      </Button>
      <Button width={16} onClick={() => handleSelectPage(pages.length)}>
        <ArrowRightIcon />
      </Button>
    </Stack>
  );
}
