/** @format */

import Head from "next/head";
import { Text, Stack, Link as ChakraLink, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { MongoClient } from "mongodb";
import { InferGetStaticPropsType } from "next";
import { createContext } from "react";
import { useRouter } from "next/router";

import TruncatedText from "../../components/TruncatedText";
import ArcContainer from "../../components/Arc";
import { MangaDocument } from "../../types";
import styles from "../../styles/Home.module.css";

export const MangaContext = createContext<MangaDocument>({} as MangaDocument);

export const getServerSideProps = async (context: any) => {
  const dbURI = process.env.MONGODB_URI;
  const { params } = context;
  const mangaName = params ? params.manga : "Jujutsu Kaisen";

  try {
    const connection = await MongoClient.connect(dbURI as string)
      .then((client) => client)
      .catch(() => {
        throw new Error("Error al conectar con la base de datos");
      });

    const db = connection.db("manga-reader-database");
    const dbCollection = db.collection<MangaDocument>("mangas");

    if (!dbCollection) throw new Error("Error la colección de mangas en la base de datos");
    const [{ name, content, description, periodity, state, downloadable }] = await dbCollection
      .find(
        { name: mangaName },
        {
          projection: {
            name: 1,
            content: 1,
            description: 1,
            periodity: 1,
            state: 1,
            downloadable: 1,
            _id: 0,
          },
        },
      )
      .toArray();
    const manga: MangaDocument = {
      name,
      content,
      description,
      periodity: periodity ?? "",
      state: state ?? "",
      downloadable: downloadable ?? false,
    };

    if (!manga) throw new Error(`Error buscando el manga de ${mangaName}`);

    return {
      props: {
        manga: manga,
      },
    };
  } catch (err) {
    return {
      props: {
        message: err as string,
      },
    };
  }
};

const Home = ({ manga, message }: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Clover Kingdom</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className={styles.main}>
        <Stack width={"100%"}>
          {manga && (
            <MangaContext.Provider value={manga}>
              <Stack
                alignItems={{
                  base: "center",
                  sm: "center",
                  lg: "flex-start",
                }}
                direction={{ base: "column", lg: "row" }}
                justifyContent={"center"}
                width={"100%"}
              >
                <VStack
                  align={{ base: "center", lg: "flex-start" }}
                  justify={{ base: "center", xl: "space-around" }}
                  padding={{ base: "1rem", sm: "3rem" }}
                  spacing={"5"}
                  width={{ base: "100%", lg: "50%", xl: "30%" }}
                >
                  <NextLink href="/">
                    <ChakraLink textDecoration={"underline"}>Volver</ChakraLink>
                  </NextLink>
                  <Text
                    as={"h1"}
                    fontSize={"5xl"}
                    fontWeight="bold"
                    textAlign={{ base: "center", lg: "left" }}
                    width={"100%"}
                  >
                    {manga.name}
                  </Text>
                  <TruncatedText truncatedLines={7}>{manga.description}</TruncatedText>
                  <Text>
                    <Text as={"strong"}>Periodicidad</Text>: {manga.periodity}
                  </Text>
                  <Text>
                    <Text as={"strong"}>Estado</Text>: {manga.state}
                  </Text>
                </VStack>
                <Stack
                  alignItems={"center"}
                  alignSelf={"center"}
                  justifyContent="center"
                  minWidth={{ base: "250px", sm: "400px" }}
                  spacing={"1rem"}
                  width={{ base: "100%", sm: "50%" }}
                >
                  {manga.content.map((arc, arcIdx) => {
                    return <ArcContainer key={arcIdx} {...arc} />;
                  })}
                </Stack>
              </Stack>
            </MangaContext.Provider>
          )}
          {message && (
            <Text>
              Ha ocurrido un error {message}. Intenta de nuevo
              <Text
                _hover={{ cursor: "pointer" }}
                color={"whiteAlpha.400"}
                onClick={() => router.reload()}
              >
                recargando la página
              </Text>
            </Text>
          )}
        </Stack>
      </main>
    </div>
  );
};

export default Home;