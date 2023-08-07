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
        const users = await prismadb.user.findMany();
        if (!users) {
            return res.status(422).json({ error: "No Users Found" });
        }
        return res.status(200).json(users);

    } catch (error) {
        return res.status(400).json({ error: `Something went wrong: ${error}` });
    }
}
