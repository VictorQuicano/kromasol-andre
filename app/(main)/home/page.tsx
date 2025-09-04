//import { useState } from "react";
"use client";

import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { motion } from "motion/react";

export default async function Home() {
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
    <main className="min-h-screen min-w-full mx-auto">
      <div className="min-w-full bg-black py-8 flex justify-center items-center relative">
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
        <motion.a
          href="/conocenos"
          className="bg-white px-6 py-2 border-primary-color border-2 rounded-lg z-10 absolute bottom-10"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="text-primary-color font-semibold">Conoce más</span>
        </motion.a>
      </div>
      <div className="bg-secondary-color py-12 flex flex-col justify-center items-center">
        <h3 className="text-white text-center">
          <span className="text-primary-color">Cambia </span>tu estilo de vida
        </h3>
        <h4 className="text-center text-white">
          Conoce nuestros productos y preparate para mejorar tu estilo de vida
        </h4>
      </div>
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
