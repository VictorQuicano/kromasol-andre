export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse {
  products: Product[];
  pagination: Pagination;
  error?: string;
}

export interface ProductFilters {
  categoryId?: string;
  search?: string;
  page?: string;
  limit?: string;
}

export interface UpdateProductDto {
  //id: string;
  name?: string;
  description?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  price?: number | string;
  categoryId?: number | string;
}

export interface ProductFormData {
  name: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  price: string;
  categoryId: string;
}

export interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: ProductFormData) => Promise<void> | void;
  onCancel?: () => void;
}

export interface Filters {
  search: string;
  categoryId: string;
  page: number;
}
export interface Product {
  id: string | number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  price: number | string;
  categoryId: number | string;
  category: {
    id: string | number;
    name: string;
    color: string;
    slug: string;
  };
}
