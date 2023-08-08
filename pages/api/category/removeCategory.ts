import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { id } = req.body;
  try {
    const removedCategory = await prismadb.category.delete({
      where: {
        id: id,
      },
    });
    if (!removedCategory) {
      return res.status(422).json({ error: "No Category Removed" });
    }
    return res.status(200).json(removedCategory);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
