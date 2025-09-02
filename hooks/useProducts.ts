import { useState, useEffect, useCallback } from "react";
//import { Product } from "@prisma/client";
import {
  Pagination,
  ApiResponse,
  ProductFilters,
  ProductFormData,
  UpdateProductDto,
  Filters,
  Product,
} from "../type";

export const useProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCreate, setErrorCreate] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Obtener productos
  const fetchProducts = useCallback(async (filters: Filters): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`/api/products?${queryParams}`);
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al obtener productos");
      }

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear producto
  const createProduct = async (productData: ProductFormData) => {
    setLoading(true);
    setErrorCreate(null);

    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price.toString());
      formData.append("categoryId", productData.categoryId.toString());
      if (productData.description)
        formData.append("description", productData.description);
      if (productData.videoUrl)
        formData.append("videoUrl", productData.videoUrl);
      if (productData.image) formData.append("image", productData.image); // debe ser un File

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData, // 🚀 no ponemos headers, fetch lo maneja
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear producto");
      }

      setProducts((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setErrorCreate(err.message);
      } else {
        setErrorCreate("Error desconocido");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const updateProduct = async (
    id: string | number,
    productData: UpdateProductDto
  ): Promise<Product> => {
    setLoading(true);
    setErrorCreate(null);

    try {
      const formData = new FormData();
      if (productData.name) formData.append("name", productData.name);
      if (productData.price)
        formData.append("price", productData.price.toString());
      if (productData.categoryId)
        formData.append("categoryId", productData.categoryId.toString());
      if (productData.description)
        formData.append("description", productData.description);
      if (productData.videoUrl)
        formData.append("videoUrl", productData.videoUrl);
      if (productData.image) formData.append("image", productData.image);

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data: Product & { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al actualizar producto");
      }

      // Actualizar el producto en la lista
      setProducts((prev) =>
        prev.map((product) => (product.id === Number(id) ? data : product))
      );

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorCreate(err.message);
        throw err;
      } else {
        setErrorCreate("Error desconocido");
        throw new Error("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id: string | number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar producto");
      }

      // Remover el producto de la lista
      setProducts((prev) =>
        prev.filter((product) => product.id !== Number(id))
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      } else {
        setError("Error desconocido");
        throw new Error("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    errorCreate,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
