/** @format */

import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient } from "mongodb";

import { RawMangaDocument } from "../../../../types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { manga: mangaName, chapter } = req.query;
  const chapterNumber = parseInt(chapter as string);
  const dbURI = process.env.MONGODB_URI;

  try {
    const connection = await MongoClient.connect(dbURI as string).then((client) => client);

    if (!connection) throw new Error("Error al conectar con la base de datos");
    const db = connection.db("manga-reader-database");
    const dbCollection = db.collection<RawMangaDocument>("chapters");

    if (!dbCollection) throw new Error("Error obteniendo colección de capítulos");
    const [
      {
        chapters: [chapter],
      },
    ] = await dbCollection
      .aggregate<RawMangaDocument>([
        { $match: { name: mangaName } },
        {
          $project: {
            chapters: {
              $filter: {
                input: "$chapters",
                as: "chapter",
                cond: { $eq: ["$$chapter.number", chapterNumber] },
              },
            },
          },
        },
      ])
      .toArray();

    return res.status(200).json({ chapter });
  } catch (error) {
    return res.status(400).json({
      message: `An error has ocurred: ${error}`,
    });
  }
}
