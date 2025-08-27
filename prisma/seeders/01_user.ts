import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  let password = "securepassword123";
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      password: hashedPassword,
    },
  });
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
