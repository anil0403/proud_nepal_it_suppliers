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
    const deletedBrand = await prismadb.brand.delete({
      where: {
        id: id,
      },
    });
    if (!deletedBrand) {
      return res.status(422).json({ error: "No Brand Removed" });
    }
    return res.status(200).json(deletedBrand);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
