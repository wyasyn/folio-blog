"use server";

import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../db";

/**
 * Creates a new user with the given name, email, and PIN.
 * @throws {Error} If any required field is missing or if the email already exists.
 */
export const createUser = async ({
  name,
  email,
  pin,
}: {
  name: string;
  email: string;
  pin: string;
}): Promise<User> => {
  if (!name?.trim() || !email?.trim() || !pin?.trim()) {
    throw new Error("All fields are required and must not be empty");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true },
  });
  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const hashedPin = await bcrypt.hash(pin, 10);
  return prisma.user.create({
    data: {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      hashedPin,
    },
  });
};

/**
 * Finds a user by their ID.
 * @returns The user object if found, null otherwise.
 */
export const findUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

/**
 * Validates a user's PIN.
 * @throws {Error} If the user is not found.
 */
export const validatePin = async (
  userId: number,
  pin: string
): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { hashedPin: true },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return bcrypt.compare(pin, user.hashedPin);
};

/**
 * Updates a user's PIN.
 * @throws {Error} If the user is not found or if the new PIN is invalid.
 */
export const updateUserPin = async (
  userId: number,
  newPin: string
): Promise<User> => {
  if (!newPin?.trim()) {
    throw new Error("New PIN must not be empty");
  }
  const hashedPin = await bcrypt.hash(newPin, 10);
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { hashedPin },
    });
  } catch {
    throw new Error("Failed to update user PIN. User may not exist.");
  }
};

/**
 * Deletes a user by their ID.
 * @returns true if the user was successfully deleted, false if the user wasn't found.
 */
export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    if ((error as { code?: string }).code === "P2025") {
      // Prisma error code for record not found
      return false;
    }
    throw error; // Re-throw other errors
  }
};
