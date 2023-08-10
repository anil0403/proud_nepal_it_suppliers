import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

import multiparty from "multiparty";
import fs from "fs/promises";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new multiparty.Form();
    const data: { [key: string]: any } = {};
    const images: string[] = [];

    form.on("field", (name, value) => {
      data[name] = value;
    });

    form.on("file", (name, file) => {
      const fileName = `${Date.now()}-${file.originalFilename}`;
      const filePath = path.join(process.cwd(), "public/products", fileName);
      images.push(fileName);

      fs.writeFile(filePath, file.buffer);
    });

    console.log(data.name);
    console.log(data.features);
    console.log(data.price);

    form.on("close", async () => {
      try {
        const createdProduct = await prismadb.product.create({
          data: {
            name: data.name,
            features: data.features,
            price: data.price,
            discount: data.discount,
            thumbnail: data.thumbnail,
            img1: data.img1,
            img2: data.img2,
            img3: data.img3,
            stock: parseInt(data.stock),
            total: parseFloat(data.total),
            availability: data.availability === "true",
            brand: data.brandId ? { connect: { id: data.brandId } } : undefined,
            Category: data.categoryId
              ? { connect: { id: data.categoryId } }
              : undefined,
          },
        });

        // Store image names in Prisma
        const newProduct = await prismadb.image.createMany({
          data: images.map((imageName) => ({
            productId: createdProduct.id,
            imageName,
          })),
        });

        res
          .status(200)
          .json({ message: "Form submitted successfully", createdProduct });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
      }
    });
    form.parse(req);
    res.status(200).json({ message: "Form submitted successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
