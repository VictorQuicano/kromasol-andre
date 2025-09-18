//import { useState } from "react";
"use client";

import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const categories = [
    {
      name: "Digestion",
      description:
        "Mejora tu bienestar intestinal y siente ligereza todos los días.",
      color: "#9f187e",
      image: "/categorias_home/digestion.webp",
    },
    {
      name: "Peso",
      description: "Apoya el control de tu peso de manera natural y saludable.",
      color: "#039ce8",
      image: "/categorias_home/peso.avif",
    },
    {
      name: "Antioxidantes",
      description: "Protege tus células y potencia tu vitalidad desde adentro.",
      color: "#442463",
      image: "/categorias_home/antioxidante.jpg",
    },
    {
      name: "Energizantes",
      description: "Recarga tu cuerpo y mente con energía duradera y natural.",
      color: "#e10833",
      image: "/categorias_home/energizante.avif",
    },
    {
      name: "Belleza",
      description:
        "Resalta tu belleza natural con nutrición para piel, cabello y uñas.",
      color: "#8ae0bd",
      image: "/categorias_home/belleza.jpg",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Más de 200 productos de belleza
                <span className="block text-yellow-300">y nutrición</span>
              </h1>
              <p className="text-lg mb-6 opacity-90">
                Descubre nuestra amplia gama de productos para tu bienestar y
                belleza
              </p>
              <a
                className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                href="/productos"
              >
                Ver productos
              </a>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-8 inline-block">
                <div className="w-64 h-64 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <Image
                    src="/sport_boy.webp"
                    alt="Persona disfrutando"
                    className="object-contain"
                    fill
                  ></Image>
                  <div className="text-6xl">🥤</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="flex flex-col items-center mb-12">
          <h3 className="font-semibold text-3xl md:text-5xl uppercase">
            Conoce nuestras{" "}
          </h3>
          <h2 className="text-3xl md:text-7xl uppercase font-bold text-primary-color">
            FAMILIA DE PRODUCTOS
          </h2>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-6 items-center justify-center">
            {categories.map((category) => {
              return (
                <div
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow w-[45%] md:w-[30%]"
                  key={category.name}
                >
                  <div className="bg-blue-100 rounded-xl p-4 mb-4">
                    <div className="w-full h-40 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        className="object-cover rounded-lg"
                        fill
                      ></Image>
                    </div>
                  </div>
                  <div
                    className="text-white px-3 py-1 rounded-full text-sm inline-block mb-2"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.name}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category.description}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Company Values */}
      <section className="py-16 px-4 bg-secondary-color text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-7xl uppercase font-bold text-primary-color mb-4">
              KROMASOL
            </h2>
            <p className="text-xl text-gray-100">Cuida que Llena tu Vida</p>
            <p className="text-gray-200">cuidado y bienestar para todos</p>
            <a
              href="/distribuidor"
              className="bg-cyan-500 text-white px-8 py-3 rounded-full hover:bg-cyan-600 transition-colors mt-8 max-w-fit"
            >
              Conoce más de nosotros
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-700 rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-zinc-600 rounded-xl p-6 mb-4">
                <Users className="w-12 h-12 text-cyan-400 mx-auto" />
              </div>
              <h3 className="text-6xl font-bold text-cyan-400 mb-2">+34</h3>
              <p className="text-white">Años de experiencia</p>
            </div>

            <div className="bg-zinc-700 rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-zinc-600 rounded-xl p-6 mb-4">
                <Award className="w-12 h-12 text-cyan-400 mx-auto" />
              </div>
              <h3 className="text-6xl font-bold text-cyan-400 mb-2">+20</h3>
              <p className="text-white">Países</p>
            </div>

            <div className="bg-zinc-700 rounded-2xl p-6 shadow-sm text-center">
              <div className="bg-zinc-600 rounded-xl p-6 mb-4">
                <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto" />
              </div>
              <h3 className="text-6xl font-bold text-cyan-400 mb-2">+7M</h3>
              <p className="text-white">de clientes en todo el mundo</p>
            </div>
          </div>
        </div>
      </section>
      {/* Community Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-primary-color to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="relative h-80 mb-6 rounded-2xl overflow-hidden">
                    {/* Imagen de fondo */}
                    <Image
                      src="https://us.images.westend61.de/0001958149pw/tres-mujeres-profesionales-discuten-durante-una-reunion-de-negocios-en-una-oficina-moderna-ejemplificando-el-trabajo-en-equipo-y-la-colaboracion-en-una-empresa-dirigida-por-mujeres-ADSF54356.jpg"
                      alt="Fondo distribuidores"
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Capa oscura encima (opcional, como tu gradient overlay) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>

                    {/* Contenido */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <h3 className="!text-5xl md:!text-6xl text-primary-color font-semibold mb-2">
                          Distribuidores
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Transforma tu vida. Súmate a la gente que cree en la gente.
                  </h2>
                  <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Conoce más aquí
                  </button>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="text-sm">
                          Beneficios principales diarios 40% y 30%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Award className="w-5 h-5 text-yellow-400 mr-1" />
                        <span className="text-sm">
                          Planes de progreso con los productos que ya consumes
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories 
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full w-96 h-96 flex items-center justify-center">
                <div className="bg-white rounded-full p-4">
                  <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-6xl">👩‍💼</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Gente real. <span className="text-blue-600">Éxito real</span>
              </h2>
              <p className="text-gray-600 mb-8">
                La vida real está llena de buenas historias y excelentes
                testimonios de nuestros distribuidores.
              </p>

              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">María</h4>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Trabajar para Omnilife me ha permitido crecer tanto personal
                  como profesionalmente..."
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Lic. Teresa Guillermina Moreno
                    </h4>
                    <p className="text-sm text-blue-600">Ejecutiva</p>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  "Empecé consumiendo productos de bienestar, ahora trabajo
                  construyendo un futuro próspero..."
                </p>
              </div>

              <div className="flex justify-center mt-8">
                <button className="bg-white border border-purple-600 text-blue-600 px-6 py-2 rounded-full hover:bg-purple-50 transition-colors">
                  Ver testimonios
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}
    </div>
  );
}

function ProductHero({
  product,
}: {
  product: {
    slug: string;
    imageSrc: string;
    imageAlt: string;
    title: string;
    summary: string;
  };
}) {
  const { imageSrc, imageAlt, title, summary, slug } = product;
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
        <Image
          alt={imageAlt}
          className="object-cover rounded-lg bg-slate-300"
          height="500"
          width="500"
          src={imageSrc}
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {summary}
          </p>
          <Link
            prefetch={true}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            href={`/product/${slug}`}
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
}
