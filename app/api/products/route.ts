import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();
const cloudinaryClient = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// POST - Crear nuevo producto
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, imageUrl, videoUrl, price, categoryId } = body;

    // Validaciones básicas
    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: "Nombre, precio y categoría son requeridos" },
        { status: 400 }
      );
    }

    // Generar slug único
    const baseSlug = name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    let slug = baseSlug;
    let counter = 1;

    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Crear producto
    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        price: parseFloat(price),
        slug,
        categoryId: parseInt(categoryId),
      },
      include: {
        category: true,
      },
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
  } finally {
    await prisma.$disconnect();
  }
}
