//import { useState } from "react";
"use client";

import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { motion } from "motion/react";

export default function Home() {
  //const [showPromoBanner, setShowPromoBanner] = useState<boolean>(false);
  const awards = [
    {
      id: 1,
      category: "Premio",
      title: "Premio Kromasol a la mejor empresa peruana",
      year: "2020, 2021 y 2022",
      image:
        "https://kromasol.com/wp-content/themes/kromasol/assets/img/home/icon-peruano.png",
    },
    {
      id: 2,
      category: "Premio",
      title: "Mejores empresas mexicanas",
      year: "2021",
      image:
        "https://kromasol.com/wp-content/themes/kromasol/assets/img/home/icon-mexicano.png",
    },
    {
      id: 3,
      category: "Premio",
      title: "Mejor empaque del año",
      year: "por 5 años consecutivos",
      image:
        "https://kromasol.com/wp-content/themes/kromasol/assets/img/home/icon-empaque.png",
    },
    {
      id: 4,
      category: "Más",
      title: "de 40 años de experiencia",
      year: "en nuestros fundadores",
      image:
        "https://kromasol.com/wp-content/themes/kromasol/assets/img/home/icon-experiencia.png",
    },
  ];
  return (
    <main className="min-h-screen max-w-full">
      <div className="max-w-full bg-black py-8 flex justify-center items-center relative">
        <video
          autoPlay
          muted
          loop
          style={{ width: "100%" }}
          className="max-w-5xl"
        >
          <source
            src="https://kromasol.com/wp-content/uploads/2023/05/banner_web-color.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="bg-secondary-color py-12 flex flex-col justify-center items-center">
        <h3 className="font-semibold !text-xl sm:!text-3xl md:!text-5xl lg:!text-7xl text-white text-center">
          <span className="text-primary-color">Cambia </span>tu estilo de vida
        </h3>
        <h4 className="text-center text-white !text-base md:!text-4xl text-light">
          Conoce nuestros productos y preparate para mejorar tu estilo de vida
        </h4>
      </div>
      <section className="flex flex-col max-w-full bg-black">
        <div className="relative w-full h-auto">
          <Image
            src="https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/banner-compensaciones.png"
            alt="Banner de Compensaciones"
            width={1905}
            height={906}
            className="w-full h-auto"
          />
        </div>
        <KromasolPage />
      </section>
      <div className="flex flex-wrap justify-center gap-8 bg-primary-color">
        {awards.map((award) => {
          return (
            <div
              className="relative flex justify-end items-center max-h-[149px] min-h-[149px]"
              key={award.id}
            >
              <Image
                src={award.image}
                alt={award.title}
                width={94}
                height={149}
              />
              <div className="text-white flex flex-col max-w-[150px]">
                <div className="flex flex-col justify-end items-end">
                  <p className="text-sm/7 tracking-tight">{award.category}</p>
                  <div className="flex flex-col">
                    <h4 className="text-lg/5 uppercase font-semibold text-secondary-color text-wrap line-clamp-none">
                      {award.title}
                    </h4>
                    <h5 className="text-sm/7 text-wrap">{award.year}</h5>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function KromasolPage() {
  const awards = [
    {
      id: 1,
      title: "GANANCIA INMEDIATA",
      description:
        "Adquiere tus Productos con tu descuento de Distribuidor y obtén ganacias al entregarlos a Precio Público Sugerido",
      img: "https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/icon-dinero.png",
    },
    {
      id: 2,
      title: "TU GANANCIA POR INVITAR PERSONAS",
      description:
        "Invita a más personas y recibe una compensación por las primeras 12 compras que realicen",
      img: "https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/icon-ganancia.png",
    },
    {
      id: 3,
      title: "HAZ CRECER TU NEGOCIO Y GANA!",
      description:
        "Invita a más personas y adén un porcentaje de todas las compras que realicen. ¡Cadre en media afiliosa!",
      img: "https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/icon-nivel.png",
    },
    {
      id: 4,
      title: "GENERA MÁS POR COMPRAR PRODUCTO",
      description:
        "Adquiere Productos con descuento de Distribuidor y genera bonos extra",
      img: "https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/icon-producto.png",
    },
    {
      id: 5,
      title: "PATROCINA Y GANA",
      description:
        "Invita a más personas, crece tu negocio sin limitar y gana más bonos",
      img: "https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/icon-crecimiento.png",
    },
    {
      id: 6,
      title: "TE IMPULSAMOS A CONSOLIDAR TU NEGOCIO",
      description:
        "Inicia tu negocio y hazlo crecer en 9 meses. Te recompreramos a ti y a tu perfecciondo!",
      img: "https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/icon-royal.png",
    },
    {
      id: 7,
      title: "BONO DE FIN DE AÑO",
      description:
        "Sola Komosol reconoce tu adriente realizado durante el año. Gana en 30% adicional de tus ganancias semanales. ¡Y RECIBELAS EN DICIEMBRE!",
      img: "https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/icon-decembrino.png",
    },
    {
      id: 8,
      title: "AVANZA EN LA CARREGA DE TU VIDA",
      description:
        "Alcanza nuevos niveles y formosol te impulsa para que inviertas en tu negocio y lo hagan crecer sin limite",
      img: "https://kromasol.com/wp-content/themes/kromasol/assets/img/compensaciones/icon-impulso.png",
    },
  ];
  return (
    <div className="bg-gradient-to-b from-black from-[25%] via-[#1c487e] via-[73%] to-[#0a131f] to-[100%] py-8 pb-4">
      <div className="max-w-full md:max-w-5xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-12">
          <h1 className="lg:text-9xl md:text-7xl text-5xl font-bold text-blue-800 mb-4">
            KROMASOL.
          </h1>
          <p className="lg:text-4xl md:text-3xl sm:text-xl text-base text-white font-light">
            AQUÍ COMIENZA LA RIQUEZA
          </p>
        </div>

        {/* Grid de beneficios */}
        <div className="flex flex-wrap justify-center gap-4">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-black/70 rounded-xl shadow-lg p-6 border border-[#00e6f7] min-h-[320px] w-[95%] sm:w-[48%] lg:w-[30%]"
            >
              {/* Imagen con fill + object-contain */}
              <div className="relative w-[80px] h-[80px] mb-4">
                <Image
                  src={award.img}
                  alt={`Ícono de ${award.title}`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Título con línea decorativa */}
              <div className="flex gap-2 mb-4 items-center max-h-fit border-l-[11px] border-white pl-[12px]">
                <h2 className="text-xl font-bold text-white">{award.title}</h2>
              </div>

              {/* Descripción */}
              <p className="text-white font-light">{award.description}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-12 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
            ASISTE A TU SUCURSAL MÁS CERCANA
          </h2>
          {/* Llamada a la acción */}
          <motion.a
            href="/conocenos"
            className="bg-white px-6 py-2 border-primary-color border-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-primary-color font-semibold">Conoce más</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
