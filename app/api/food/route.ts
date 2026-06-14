import fs from "fs/promises";
import path from "path";
import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const ingredients = formData.get("ingredients") as string;
  const preparation = formData.get("preparation") as string;

  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json(
      { error: "Imagem não enviada" },
      { status: 400 }
    );
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${image.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  await fs.writeFile(filePath, buffer);

  const imageUrl = `/uploads/${fileName}`;

  const item = await prisma.food.create({
    data: {
      name,
      description,
      ingredients,
      Preparation: preparation,
      imageUrl, 
    },
  });

  return NextResponse.json(item);
}

export async function GET() {
  const items = await prisma.food.findMany();

  return NextResponse.json(items);
}