import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { id, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await prismadb.user.update({
      where: {
        id: id,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });
    if (!updatedUser) {
      return res.status(422).json({ error: "No Users Found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
