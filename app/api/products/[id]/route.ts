import { PrismaClient, Product } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET - Obtener producto por ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Actualizar producto
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: Partial<Product> & {
      price?: string | number;
      categoryId?: string | number;
    } = await request.json();

    const { name, description, imageUrl, videoUrl, price, categoryId } = body;

    // Verificar que el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Tipar updateData como Partial<Product>
    const updateData: Partial<Product> = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description || null;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl || null;
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl || null;
    if (price !== undefined) updateData.price = Number(price);
    if (categoryId !== undefined) updateData.categoryId = Number(categoryId);

    // Si cambia el nombre, generar nuevo slug
    if (name && name !== existingProduct.name) {
      const baseSlug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      let slug = baseSlug;
      let counter = 1;

      while (
        await prisma.product.findFirst({
          where: { slug, id: { not: parseInt(id, 10) } },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      updateData.slug = slug;
    }

    // Actualizar producto
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: updateData,
      include: { category: true },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Eliminar producto
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verificar que el producto existe
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Eliminar producto
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Producto eliminado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
