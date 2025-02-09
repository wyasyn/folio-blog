"use server";

import { PrismaClient } from "@prisma/client";
import { hash, compare as bcryptCompare } from "bcryptjs";
import { randomBytes } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function recoverPin(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const newPin = randomBytes(3).toString("hex"); // Generate a 6-character PIN
  const hashedPin = await hash(newPin, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { hashedPin },
  });

  // Send email with new PIN
  const emailHtml = `
    <h1>PIN Recovery</h1>
    <p>Hello ${user.name},</p>
    <p>Your new PIN is: <strong>${newPin}</strong></p>
    <p>Please change your PIN after logging in for security reasons.</p>
    <p>If you didn't request this PIN recovery, please contact our support team immediately.</p>
  `;
  await sendEmail(email, "PIN Recovery", emailHtml);
}

export async function changePin(
  userId: number,
  currentPin: string,
  newPin: string
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  const isCurrentPinValid = await bcryptCompare(currentPin, user.hashedPin);
  if (!isCurrentPinValid) {
    throw new Error("Current PIN is incorrect");
  }

  const hashedNewPin = await hash(newPin, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { hashedPin: hashedNewPin },
  });
}
