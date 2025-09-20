import React, { useEffect, useState } from "react";
import { X, ShoppingCart, Tag, MessageCircleMore } from "lucide-react";
import { getProductWhatsappLink } from "@/utils/whatsapp";

export interface Product {
  id: string | number;
  name: string;
  description: string | null;
  images: string[] | null;
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

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  // Si no hay producto, no mostrar el modal
  const [whatsappLink, setWhatsappLink] = useState<string>("");

  useEffect(() => {
    if (product) {
      setWhatsappLink(getProductWhatsappLink(product.name));
    } else {
      setWhatsappLink("");
    }
  }, [product]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(numPrice);
  };

  const displayImage =
    product?.imageUrl ||
    (product?.images && product.images.length > 0 ? product.images[0] : null);

  // ⬇️ Ahora sí puedes retornar condicionalmente
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto relative">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Sección de imagen/video */}
          <div className="space-y-4">
            {displayImage ? (
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={displayImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                <Tag className="w-16 h-16 text-gray-400" />
              </div>
            )}

            {/* Galería de imágenes adicionales */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md overflow-hidden bg-gray-100"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: product.category.color }}
                >
                  {product.category.name}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-green-600 text-right">
                {formatPrice(product.price)}
              </p>
            </div>

            {product.description && (
              <div className="max-h-[70%] overflow-y-auto pr-2 custom-scrollbar">
                <h3 className="text-lg font-semibold text-gray-900">
                  Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Botones de acción */}
            <div className="space-y-3 pt-4">
              <a
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircleMore className="w-5 h-5" />
                Hacer pedido AHORA
              </a>
              {/*
              <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
                Ver más detalles
              </button>
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
