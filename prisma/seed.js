// prisma/seed.js
import { prisma } from "./client.js";
import crypto from "node:crypto";

async function main() {
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = await new Promise((resolve, reject) => {
    crypto.scrypt("certamen123", salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(`${salt}:${key.toString("hex")}`);
    });
  });

  await prisma.usuario.create({
    data: {
      username: "admin",
      name: "Gustavo Alfredo Marín Sáez",
      password: hashedPassword,
    },
  });

  console.log("Usuario creado");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
