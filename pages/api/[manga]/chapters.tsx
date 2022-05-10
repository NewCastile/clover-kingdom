import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { RawMangaDocument } from "../../../types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { manga: mangaName } = req.query;
  const dbURI = process.env.MONGODB_URI;

  try {
    const connection = await MongoClient.connect(dbURI as string).then((client) => client);

    if (!connection) throw new Error("Error al conectar con la base de datos");
    const db = connection.db("manga-reader-database");
    const rawMangaCollection = db.collection<RawMangaDocument>("chapters");

    if (!rawMangaCollection) throw new Error("Error la colección de mangas en la base de datos");

    const [{ chapters: fetchedChapters }] = await rawMangaCollection
      .find({ name: mangaName })
      .toArray();

    return res.status(200).json({ chapters: fetchedChapters });
  } catch (error) {
    return res.status(400).json({
      message: `An error has ocurred: ${error}`,
    });
  }
}
