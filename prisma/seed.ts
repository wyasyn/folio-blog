import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;
  const testPin = "111111"; // Example PIN
  const hashedPin = await bcrypt.hash(testPin, saltRounds);

  const user = await prisma.user.upsert({
    where: { email: "ywalum@gmail.com" },
    update: {},
    create: {
      email: "ywalum@gmail.com",
      name: "Yasin Walum",
      hashedPin: hashedPin,
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
