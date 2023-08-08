import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const categories = await prismadb.brand.findMany();
    if (!categories) {
      return res.status(422).json({ error: "No Categories Found" });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
