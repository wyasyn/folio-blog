"use server";

import { Resend } from "resend";
import Email from "@/components/Email";
import { FormEmailProps } from "@/components/Email";
import React from "react";

const apiKey = process.env.RESEND_API_KEY;

const resend = new Resend(apiKey);

export const sendEmail = async ({
  email,
  name,
  message,
  subject,
}: FormEmailProps) => {
  try {
    if (!email || !name || !message || !subject) {
      return { error: "All fields are required" };
    }
    const { error } = await resend.emails.send({
      from: "Yasin Walum <email@ywalum.com>",
      to: "ywalum@gmail.com",
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
        error: `Sorry ${name}, Message was not sent! Please check your internet connection.`,
      };
    }
    return {
      message: `${name}, Message sent successfully`,
    };
  } catch {
    return {
      error: `Sorry ${name}, Message was not sent! Please check your internet connection.`,
    };
  }
};
