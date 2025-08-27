"use client";

import React, { useState, useEffect } from "react";
//import { Product } from "@prisma/client";
import { useCategories } from "@/hooks/useCategories";
import { Product } from "@/type";

// Tipo del formulario (todo string porque viene de inputs)
interface ProductFormData {
  name: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  price: string;
  categoryId: string;
}

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: ProductFormData) => Promise<void> | void;
  onCancel?: () => void;
  error?: string | null;
}

export default function ProductForm({
  product = null,
  onSubmit,
  onCancel,
  error,
}: ProductFormProps) {
  const { categories } = useCategories();

  const [formData, setFormData] = useState<ProductFormData>(() => ({
    name: product?.name || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    videoUrl: product?.videoUrl || "",
    price: product?.price?.toString() || "",
    categoryId: product?.categoryId?.toString() || "",
  }));

  const [loading, setLoading] = useState(false);

  // Cargar datos del producto si estamos editando
  //useEffect(() => {
  //  if (product) {
  //    setFormData({
  //      name: product.name || "",
  //      description: product.description || "",
  //      imageUrl: product.imageUrl || "",
  //      videoUrl: product.videoUrl || "",
  //      price: product.price?.toString() || "",
  //      categoryId: product.categoryId?.toString() || "",
  //    });
  //  }
  //}, []); // Solo al montar

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);

      if (!product) {
        // Limpiar formulario después de crear
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          videoUrl: "",
          price: "",
          categoryId: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Nombre *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Precio *
        </label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div>
        <label
          htmlFor="categoryId"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Categoría *
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          URL de imagen
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div>
        <label
          htmlFor="videoUrl"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          URL de video
        </label>
        <input
          type="url"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Guardando..." : product ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
