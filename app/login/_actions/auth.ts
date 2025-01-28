"use server";

import { cookies } from "next/headers";
import type { User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import type { LoginResult } from "@/types/auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1w";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

const validatePin = async (
  hashedPin: string,
  pin: string
): Promise<boolean> => {
  return bcrypt.compare(pin, hashedPin);
};

export async function loginUser(
  email: string,
  pin: string
): Promise<LoginResult> {
  const cookieStore = await cookies();
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: { id: true, email: true, name: true, hashedPin: true },
    });

    if (!user || !user.hashedPin) {
      return { success: false, message: "Invalid credentials" };
    }

    const isValid = await validatePin(user.hashedPin, pin);
    if (!isValid) {
      return { success: false, message: "Invalid credentials" };
    }

    const sessionUser = {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
    };

    const token = await new SignJWT({ ...sessionUser })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(TOKEN_EXPIRATION)
      .setIssuedAt()
      .sign(new TextEncoder().encode(JWT_SECRET));

    cookieStore.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      success: true,
      message: "Logged in successfully",
      user: sessionUser,
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }
}

export async function logoutUser(): Promise<LoginResult> {
  const cookieStore = await cookies();
  try {
    cookieStore.delete("auth_token");
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "An error occurred during logout" };
  }
}

export async function getCurrentUser(): Promise<Omit<
  User,
  "hashedPin"
> | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    const user = verified.payload as User;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
