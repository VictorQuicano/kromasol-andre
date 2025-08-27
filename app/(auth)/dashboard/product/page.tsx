"use client";
import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import ProductForm from "@/components/forms/product-form";
import { ProductFormData, Filters, Product } from "@/type";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    errorCreate,
    pagination,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const { categories } = useCategories();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    categoryId: "",
    page: 1,
  });

  useEffect(() => {
    fetchProducts(filters);
    console.log(products);
  }, [filters, fetchProducts]);

  const handleCreateProduct = async (productData: ProductFormData) => {
    try {
      await createProduct(productData);
      setShowForm(false);
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const handleUpdateProduct = async (productData: ProductFormData) => {
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  const handleDeleteProduct = async (id: number | string) => {
    toast.custom(
      (t) => (
        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 w-72">
          <p className="text-gray-800 font-medium">
            ¿Estás seguro de que quieres eliminar este producto?
          </p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await deleteProduct(id);
                  toast.success("Producto eliminado", { duration: 1000 });
                } catch (error) {
                  console.error("Error al eliminar producto:", error);
                  toast.error("Error al eliminar producto", { duration: 1000 });
                }
              }}
              className="px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Confirmar
            </button>
          </div>
        </div>
      ),
      { duration: 2000 }
    );
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleFilterChange = (name: keyof Filters, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Resetear página al filtrar
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-2 md:px-4 py-1 md:py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm md:text-base"
        >
          Nuevo Producto
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <select
            value={filters.categoryId}
            onChange={(e) => handleFilterChange("categoryId", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-medium mb-4">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </h2>
              <ProductForm
                product={editingProduct}
                error={errorCreate}
                onSubmit={
                  editingProduct ? handleUpdateProduct : handleCreateProduct
                }
                onCancel={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Lista de productos */}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {products.length === 0 ? (
              <>
                <div className="px-4 py-4 text-center text-gray-500">
                  No hay productos disponibles
                </div>
              </>
            ) : (
              <ul className="divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id}>
                    <div className="px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex w-full sm:w-auto justify-start sm:justify-normal items-center">
                        {product.imageUrl && (
                          <Image
                            className="rounded-full object-cover"
                            src={product.imageUrl}
                            alt={product.name}
                            width={40}
                            height={40}
                          />
                        )}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.category.name} • S/. {product.price} (PEN)
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full sm:w-auto justify-end sm:justify-normal items-center space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => handleFilterChange("page", filters.page - 1)}
                  disabled={filters.page <= 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  {filters.page} de {pagination.totalPages}
                </span>
                <button
                  onClick={() => handleFilterChange("page", filters.page + 1)}
                  disabled={filters.page >= pagination.totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Siguiente
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
