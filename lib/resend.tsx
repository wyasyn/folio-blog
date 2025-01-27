"use server";

import { Resend } from "resend";
import Email from "@/components/Email";
import type { FormEmailProps } from "@/components/Email";
import React from "react";

const apiKey = process.env.RESEND_API_KEY;
const myEmail = process.env.EMAIL;

if (!myEmail) {
  throw new Error("Missing MY_EMAIL environment variable");
}

if (!apiKey) {
  throw new Error("Missing RESEND_API_KEY environment variable");
}

const resend = new Resend(apiKey);

type SendEmailResult = {
  message?: string;
  error?: string;
};

export const sendEmail = async ({
  email,
  name,
  message,
  subject,
}: FormEmailProps): Promise<SendEmailResult> => {
  try {
    if (!email || !name || !message || !subject) {
      return { error: "All fields are required" };
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { error: "Invalid email format" };
    }

    const { error } = await resend.emails.send({
      from: "Yasyn <email@resend.dev>",
      to: myEmail,
      subject: "Message from ywalum.com",
      replyTo: email,
      react: React.createElement(Email, {
        message,
        email,
        name,
        subject,
      }),
    });

    if (error) {
      return {
        error: `${error.message}. Please try again later.`,
      };
    }

    return {
      message: `${name}, Message sent successfully`,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      error: `Sorry ${name}, Message was not sent! Please try again later.`,
    };
  }
};
