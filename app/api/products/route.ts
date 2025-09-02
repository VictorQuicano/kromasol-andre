import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { generateSlug } from "@/utils/functions";

import { uploadToCloudinary } from "@/utils/cloudinary_utils";

//export const config = {
//  api: {
//    bodyParser: false, // importante para recibir archivos
//  },
//};

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const categoryIdParam = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const categoryId: number | undefined = categoryIdParam
      ? parseInt(categoryIdParam, 10)
      : undefined;
    const page: number = pageParam ? parseInt(pageParam, 10) : 1;
    const limit: number = limitParam ? parseInt(limitParam, 10) : 10;
    const skip: number = (page - 1) * limit;

    // Tipamos el filtro (ejemplo tipo Prisma)
    type WhereFilter = {
      categoryId?: number;
      OR?: {
        name?: { contains: string; mode: "insensitive" };
        description?: { contains: string; mode: "insensitive" };
      }[];
    };

    const where: WhereFilter = {};

    if (categoryId !== undefined) {
      where.categoryId = categoryId;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Obtener productos con paginación
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        skip,
        take: limit,
        orderBy: { id: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const price = formData.get("price") as string | null;
    const description = formData.get("description") as string | null;
    const categoryId = formData.get("categoryId") as string | null;
    const image = formData.get("image") as File | null;
    const videoUrl = formData.get("videoUrl") as string | null;

    // ✅ Validaciones básicas
    if (!name || !price || !categoryId || !image) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // ✅ Generar slug único
    const slug = generateSlug(name);

    // ✅ Subida de imagen
    let imageUrl: string;
    try {
      imageUrl = await uploadToCloudinary(image, `products`, slug);
    } catch (err) {
      console.error("Error al subir la imagen a Cloudinary:", err);
      return NextResponse.json(
        { error: "Error al subir la imagen" },
        { status: 500 }
      );
    }

    // ✅ Crear producto en DB
    const product = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        videoUrl,
        price: parseFloat(price),
        slug,
        categoryId: parseInt(categoryId),
      },
      include: { category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    console.error("Error al crear producto:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Ya existe un producto con ese slug" },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
