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
    const updatedBrand = await prismadb.brand.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    if (!updatedBrand) {
      return res.status(422).json({ error: "No Brand Updated" });
    }
    return res.status(200).json(updatedBrand);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
