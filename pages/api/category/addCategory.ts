import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { id, name } = req.body;
  try {
    const newCategory = await prismadb.category.create({
      data: {
        id: id,
        name: name,
      },
    });
    if (!newCategory) {
      return res.status(422).json({ error: "No Category Added" });
    }
    return res.status(200).json(newCategory);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
