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
    const brands = await prismadb.brand.findMany();
    if (!brands) {
      return res.status(422).json({ error: "No Brands Found" });
    }
    return res.status(200).json(brands);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
