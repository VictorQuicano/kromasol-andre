"use client";

import React, { useState, useEffect } from "react";
import { useCategories } from "@/hooks/useCategories";
import { Product } from "@/type";

interface ProductFormData {
  name: string;
  description: string;
  image: File | null;
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

interface PreviewProps {
  previewUrl: string;
  name: string;
}

export default function ProductForm({
  product = null,
  onSubmit,
  onCancel,
  error,
}: ProductFormProps) {
  const { categories } = useCategories();
  console.log(categories);

  const [formData, setFormData] = useState<ProductFormData>(() => ({
    name: product?.name || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    image: null,
    videoUrl: product?.videoUrl || "",
    price: product?.price?.toString() || "",
    categoryId: product?.categoryId?.toString() || "",
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<PreviewProps | null>(null);
  const [file, setFile] = useState<File | null>(null);

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

    // ✅ Si hay error y se corrige, lo quitamos
    setErrors((prev) => {
      const copy = { ...prev };
      if (value.trim() !== "") {
        delete copy[name];
      }
      return copy;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    // ✅ Validar tipo de archivo
    if (!selectedFile.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Solo se permiten archivos de imagen",
      }));
      return;
    }

    // ✅ Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        image: "La imagen no debe superar los 5MB",
      }));
      return;
    }

    // ✅ Limpiar errores
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.image;
      return copy;
    });

    // ✅ Liberar memoria del preview anterior
    if (preview) {
      URL.revokeObjectURL(preview.previewUrl);
    }

    // ✅ Generar preview con metadata
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview({
      previewUrl: objectUrl,
      name: selectedFile.name,
    });

    // ✅ Guardar en estados
    setFile(selectedFile);
    setFormData((prev) => ({
      ...prev,
      image: selectedFile,
    }));
  };

  const validateForm = () => {
    console.log(formData);
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.description.trim())
      newErrors.description = "La descripción es obligatoria";
    if (!formData.price.trim()) newErrors.price = "El precio es obligatorio";
    if (!formData.categoryId.trim())
      newErrors.categoryId = "La categoría es obligatoria";
    if (!product && !formData.image)
      newErrors.image = "La imagen es obligatoria";
    if (product && !formData.image && !preview?.previewUrl) {
      newErrors.image = "La imagen es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = () => {
    setPreview(null);
    setFile(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await onSubmit(formData);

      if (!product) {
        setFormData({
          name: "",
          description: "",
          imageUrl: "",
          image: null,
          videoUrl: "",
          price: "",
          categoryId: "",
        });
        setPreview(null);
        setFile(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (product) {
      setPreview({
        previewUrl: product?.imageUrl || "",
        name: product.name + ".jpg",
      });
    } else {
      setPreview(null);
    }
  }, [product]);

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
          className={`bg-gray-50 border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        />
        {errors.name && (
          <span className="text-sm text-red-600">{errors.name}</span>
        )}
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
          className={`bg-gray-50 ${
            errors.description ? "border-red-500" : "border-gray-300"
          } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        />
        {errors.description && (
          <span className="text-sm text-red-600">{errors.description}</span>
        )}
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
          className={`bg-gray-50 border ${
            errors.price ? "border-red-500" : "border-gray-300"
          } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        />
        {errors.price && (
          <span className="text-sm text-red-600">{errors.price}</span>
        )}
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
          className={`bg-gray-50 border ${
            errors.categoryId ? "border-red-500" : "border-gray-300"
          } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <span className="text-sm text-red-600">{errors.categoryId}</span>
        )}
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Imagen del producto
        </label>
        {preview ? (
          <Preview preview={preview} handleDelete={handleDelete} />
        ) : (
          <>
            <input
              className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
              id="file_input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            ></input>
            {errors.image && (
              <span className="text-sm text-red-600">{errors.image}</span>
            )}
          </>
        )}
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
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            errors.videoUrl ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.videoUrl && (
          <span className="text-sm text-red-600">{errors.videoUrl}</span>
        )}
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
function Preview({
  preview,
  handleDelete,
}: {
  preview: PreviewProps;
  handleDelete: () => void;
}) {
  return (
    <div className="flex items-start justify-between bg-gray-100 rounded-xl p-2">
      <div className="me-2 flex gap-4">
        <img
          src={preview?.previewUrl}
          alt={preview?.name}
          className="w-10 h-10 object-cover rounded-md"
        />
        <div className="flex flex-col">
          <span className="flex items-center text-sm font-medium text-gray-900">
            {preview?.name}
          </span>
          <span className="flex text-xs font-normal text-gray-500 gap-2">
            IMG
          </span>
        </div>
      </div>
      <div className="inline-flex self-center items-center">
        <button
          className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
          type="button"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-5 h-5 text-gray-900"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      </div>
    </div>
  );
}
