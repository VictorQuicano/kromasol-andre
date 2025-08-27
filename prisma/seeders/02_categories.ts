import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let categories = [
    {
      name: "Energizante",
      color: "#e10833",
      slug: "energizante",
    },
    {
      name: "Antioxidante",
      color: "#442463",
      slug: "antioxidante",
    },
    {
      name: "Peso",
      color: "#039ce8",
      slug: "peso",
    },
    {
      name: "Digestión",
      color: "#9f187e",
      slug: "digestion",
    },
  ];
  await Promise.all(
    categories.map((categoryItem) =>
      prisma.category.create({
        data: {
          name: categoryItem.name,
          color: categoryItem.color,
          slug: categoryItem.slug,
        },
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
