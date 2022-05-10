import { Image as ChrakraImage, Spinner, VStack, Box, Text, Link, Stack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { ChapterContext } from "../ChapterViewerContext/Provider";

import ChapterPane from "./ViewerPane";

export default function ViewerImageContainer() {
  const {
    state: { chapter, pages, page: currentPage },
  } = useContext(ChapterContext);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onLoadHandler = () => {
    setEnabled(true);
  };
  const onErrorHandler = () => {
    setError(true);
  };

  useEffect(() => {
    setEnabled(false);
    setError(false);
  }, [currentPage]);

  return (
    <>
      {error ? (
        <Box width={{ base: "95", lg: "60%" }}>
          <Text>
            Error al cargar la imagen. Haz click{" "}
            <Link href={`/chapter/${chapter}/${currentPage}`}>aquí para recargar la página</Link>
          </Text>
        </Box>
      ) : (
        <Stack direction={"row"} position={"relative"} spacing={0} width={"max-content"}>
          <ChrakraImage
            fallback={
              <VStack height={"30%"}>
                <Spinner />
              </VStack>
            }
            src={pages[currentPage - 1]}
            width={"100%"}
            zIndex={1}
            onError={onErrorHandler}
            onLoad={onLoadHandler}
          />
          {enabled && <ChapterPane direction={"right"} />}
          {enabled && <ChapterPane direction={"left"} />}
        </Stack>
      )}
    </>
  );
}
