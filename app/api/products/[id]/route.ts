import { PrismaClient, Product } from "@prisma/client";
import { NextResponse } from "next/server";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/utils/cloudinary_utils";

import { UpdateProductDto } from "@/type";
import { generateSlug } from "@/utils/functions";

const prisma = new PrismaClient();

// GET - Obtener producto por ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { id: isNaN(parseInt(id)) ? undefined : parseInt(id) },
          { slug: id },
        ],
      },
      include: { category: true },
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

    const formData = await request.formData();
    console.log(formData);

    const name = formData.get("name") as string | null;
    const price = formData.get("price") as string | null;
    const description = formData.get("description") as string | null;
    const categoryId = formData.get("categoryId") as string | null;
    const image = formData.get("image") as File | null;
    const videoUrl = formData.get("videoUrl") as string | null;
    let newSlug;

    // Verificar que el producto existe
    const existingProduct = await prisma.product.findFirst({
      where: {
        OR: [
          { id: isNaN(parseInt(id)) ? undefined : parseInt(id) },
          { slug: id },
        ],
      },
      include: { category: true },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    // Tipar updateData como Partial<Product>
    const updateData: Partial<Product> = {};

    if (name && name !== existingProduct.name) {
      updateData.name = name;
      const slug = generateSlug(name);
      updateData.slug = slug;
      newSlug = slug;
    } else {
      newSlug = existingProduct.slug;
    }
    if (description) {
      updateData.description = description;
    }
    if (image) {
      await deleteFromCloudinary(existingProduct.imageUrl!);
      const imageUrl = await uploadToCloudinary(image!, `products`, newSlug);
      updateData.imageUrl = imageUrl;
    } else {
      updateData.imageUrl = existingProduct.imageUrl;
    }
    if (videoUrl) updateData.videoUrl = videoUrl || null;
    if (price) updateData.price = parseFloat(price);
    if (categoryId) updateData.categoryId = parseInt(categoryId);

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
    await deleteFromCloudinary(existingProduct.imageUrl!);
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
