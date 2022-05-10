import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

import { RawMangaChapter } from "../../../types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { entrie, manga } = req.body as {
        entrie: RawMangaChapter[] | RawMangaChapter;
        manga: string;
      };

      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });
      if (!isArrayOfRawMangaChapters(entrie)) {
        const public_ids = entrie.pages.map(
          (_, pageIdx) => `${manga}/${entrie.number}/${pageIdx + 1}`,
        );
        const zipUrl = cloudinary.v2.utils.download_zip_url({
          public_ids,
          resource_type: "image",
          flatten_folders: true,
        });

        return res.status(200).json({ message: `zip url generated`, zipUrl });
      } else {
        const public_ids = entrie.flatMap((chapter) => {
          const pages_ids = chapter.pages.map(
            (_, pageIdx) => `${manga}/${chapter.number}/${pageIdx + 1}`,
          );

          return pages_ids;
        });
        const zipUrl = cloudinary.v2.utils.download_zip_url({
          public_ids,
          prefixes: [manga],
          resource_type: "image",
        });

        return res.status(200).json({ message: `zip url generated`, zipUrl });
      }
    } catch (error) {
      return res.status(400).json({ message: `An error has ocurred: ${error}` });
    }
  } else {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }
}

function isArrayOfRawMangaChapters(obj: unknown): obj is RawMangaChapter[] {
  return Array.isArray(obj) && obj.every(isRawMangaChapter);
}

function isRawMangaChapter(obj: unknown): obj is RawMangaChapter {
  return obj !== null && typeof (obj as RawMangaChapter).number === "number";
}
