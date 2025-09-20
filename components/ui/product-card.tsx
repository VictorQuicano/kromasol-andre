import React, { useState, ReactNode } from "react";

import { Product } from "@/type";
import { logos } from "@/consts";

interface ProductCardProps {
  product: Product;
  children?: ReactNode;
  wholesalePrice?: number | string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  children,
  wholesalePrice,
  onClick,
}) => {
  const count = product.images?.length ?? 0;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (count > 1) {
      setCurrentImageIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (count > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Obtener el logo de la categoría
  const categoryLogo = logos[product.category.slug];

  return (
    <div
      className="tarjeta-producto"
      style={{
        background: "#fff",
        borderRadius: "13px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px 30px",
        width: "300px",
        position: "relative",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {/* Pseudo-elemento ::before simulado con imagen de categoría */}
      {categoryLogo && (
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "40px",
            height: "40px",
            backgroundImage: `url(${categoryLogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: 2,
          }}
        />
      )}

      <div className="__carrousel--interior" style={{ width: "100%" }}>
        <div
          className="previo-producto carrousel__productos"
          style={{ position: "relative" }}
        >
          {/* Contenedor para children o imágenes */}
          <div
            style={{
              width: "100%",
              minWidth: "300px",
              minHeight: "300px",
              maxWidth: "300px",
              maxHeight: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              backgroundColor: "#f8f9fa",
            }}
          >
            {children ? (
              // Si hay children, los mostramos
              <div style={{ maxWidth: "300px", maxHeight: "300px" }}>
                {children}
              </div>
            ) : (
              // Si no hay children, mostramos las imágenes del producto
              count > 0 && (
                <div className="opcion-galeria activo">
                  <a
                    href={product.images?.[currentImageIndex]}
                    className="imagen-galeria"
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    <div className="titulo-producto-mx">
                      <h2
                        style={{
                          margin: "10px 0",
                          fontSize: "18px",
                          color: "#333",
                          textAlign: "center",
                        }}
                      >
                        {product.name}
                      </h2>
                    </div>
                    <img
                      alt={`Producto ${product.name}`}
                      className="img-producto"
                      src={product.images?.[currentImageIndex]}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "250px",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </a>
                </div>
              )
            )}
          </div>

          {/* Controles del carrusel - solo si hay múltiples imágenes y no hay children */}
          {!children && count > 1 && (
            <div
              className="galeria-producto"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 20px",
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                background: "rgba(255,255,255,0.9)",
              }}
            >
              <button
                onClick={prevImage}
                className="__anterior"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                className="__circulos"
                style={{ display: "flex", gap: "8px" }}
              >
                {product.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`__circulo ${
                      index === currentImageIndex ? "activo" : ""
                    }`}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      border: "none",
                      background:
                        index === currentImageIndex ? "#007bff" : "#ccc",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextImage}
                className="__siguiente"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#333"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Título del producto */}
      <h2
        className={`titulo-producto-mx ${
          onClick ? "cursor-pointer hover:text-blue-600" : ""
        }`}
        style={{
          margin: "15px 0 10px 0",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          padding: "0 15px",
        }}
        onClick={onClick ?? undefined} // solo asigna si existe
      >
        {product.name}
      </h2>

      {/* Precios */}
      <div
        className="precios-producto"
        style={{
          width: "100%",
          padding: "0 20px 20px 20px",
        }}
      >
        {wholesalePrice && (
          <div className="precio-mayorista" style={{ marginBottom: "8px" }}>
            <h3
              style={{
                fontSize: "14px",
                color: "#666",
                margin: "0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Precio Mayorista
              <span style={{ color: "#28a745", fontWeight: "bold" }}>
                S/ {wholesalePrice}
              </span>
            </h3>
          </div>
        )}

        <div className="precio-publico">
          <h3
            style={{
              fontSize: "16px",
              color: "#333",
              margin: "0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Precio Público
            <span style={{ color: "#dc3545", fontWeight: "bold" }}>
              S/ {product.price}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};
