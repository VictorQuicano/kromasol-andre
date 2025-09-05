"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Category } from "@prisma/client";
import Image from "next/image";

import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { logos } from "@/consts";
import { Filters, Product } from "@/type";

import { ProductCard } from "@/components/ui/product-card";

export default function Products() {
  const { products, fetchProducts, loading } = useProducts();
  const { categories } = useCategories();

  const [filters, setFilters] = useState<Filters>({
    search: "",
    categoryId: "",
    page: 1,
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchProducts(filters);
    console.log(products);
  }, [filters, fetchProducts]);

  const handleChangeCategory = (newCategory: number | null) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: newCategory ? newCategory.toString() : "",
      page: 1,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }));
  };

  const getCategoryById = (categoryId: number | string) => {
    return categories?.find((cat) => cat.id === categoryId);
  };

  const getCategoryColor = (categoryId: number | string) => {
    return categories?.find((cat) => cat.id === categoryId)?.color;
  };

  return (
    <div className="flex flex-col w-full md:max-w-7xl flex-1 py-4 px-8">
      {/* Header */}
      <div className="p-8">
        <h1
          className="text-5xl font-bold text-gray-900 mb-2 uppercase"
          style={{
            color:
              filters.categoryId === ""
                ? "#ffffff"
                : getCategoryColor(filters.categoryId),
          }}
        >
          Productos
        </h1>
        <div
          style={{
            width: "100%",
            height: "3px",
            background: `linear-gradient(
              90deg,
              ${
                filters.categoryId === ""
                  ? "#ffffff"
                  : getCategoryColor(filters.categoryId)
              } 0%,
              ${
                filters.categoryId === ""
                  ? "#ffffff"
                  : getCategoryColor(filters.categoryId)
              } 49%,
              rgba(202, 0, 136, 0) 100%
            ) no-repeat padding-box`,
          }}
        />

        <p className="text-gray-400 mt-4">
          Explora nuestra colección de productos
        </p>
      </div>
      <div className="flex flex-col w-full "></div>
      {/* Filtros */}
      <div className="mb-8 space-y-6">
        {/* Barra de búsqueda */}
        {products.length > 5 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Filtros de categoría y vista */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Filtro de categorías */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Categorías:
            </span>

            <button
              onClick={() => handleChangeCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !filters.categoryId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todas
            </button>

            {categories?.map((category: Category) => (
              <button
                key={category.id}
                onClick={() => handleChangeCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex gap-2 ${
                  filters.categoryId === category.id.toString()
                    ? "text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor:
                    filters.categoryId === category.id.toString()
                      ? category.color
                      : undefined,
                }}
              >
                <Image
                  src={logos[category.slug]}
                  alt={category.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <p
                  style={{
                    color:
                      filters.categoryId === category.id.toString()
                        ? "white"
                        : category.color,
                  }}
                >
                  {category.name}
                </p>
              </button>
            ))}
          </div>

          {/* Selector de vista */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Vista:</span>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-l-lg ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-r-lg ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Productos */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : products && products.length > 0 ? (
        <>
          {/* Contador de resultados */}
          <div className="mb-6">
            <p className="text-gray-600">
              Mostrando {products.length} producto
              {products.length !== 1 ? "s" : ""}
              {filters.categoryId && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {getCategoryById(parseInt(filters.categoryId))?.name}
                </span>
              )}
            </p>
          </div>

          {/* Grid/Lista de productos */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {products.map((product: Product) => {
              const category = getCategoryById(product.categoryId);

              return viewMode === "grid" ? (
                // Vista de grid
                <ProductCard key={product.id} product={product}>
                  <Image
                    src={
                      product.imageUrl ??
                      "https://bofrike.in/wp-content/uploads/2021/08/no-product.png"
                    }
                    alt={product.description ?? ""}
                    fill
                    className="object-cover"
                  />
                </ProductCard>
              ) : (
                // Vista de lista
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="flex">
                    <div className="w-32 h-32 bg-gray-100 flex-shrink-0">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📦
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {product.name}
                          </h3>
                          {category && (
                            <span
                              className="px-2 py-1 text-xs rounded-full text-white"
                              style={{ backgroundColor: category.color }}
                            >
                              {category.name}
                            </span>
                          )}
                        </div>

                        {product.description && (
                          <p className="text-gray-600 text-sm mb-3">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600">
                          ${product.price.toLocaleString()}
                        </span>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
                          Ver más
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
              📦
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-600 mb-4">
            {filters.search || filters.categoryId
              ? "Intenta cambiar los filtros de búsqueda"
              : "Aún no hay productos disponibles"}
          </p>
          {(filters.search || filters.categoryId) && (
            <button
              onClick={() =>
                setFilters({ search: "", categoryId: "", page: 1 })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
