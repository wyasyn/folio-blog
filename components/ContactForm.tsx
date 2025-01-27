"use client";
import { sendEmail } from "@/lib/resend";
import React, { useState } from "react";
import { z } from "zod";

import { AlertCircle, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  email: z.string().email("Invalid email address").max(50),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(50),
  message: z.string().min(7, "Message must be at least 7 characters").max(500),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data using Zod
    const validation = formSchema.safeParse(formData);

    if (!validation.success) {
      const errorMessage = validation.error.errors
        .map((err) => err.message)
        .join(", ");
      setError(errorMessage);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await sendEmail(formData);
      if (response.error) {
        setError(response.error);
      } else {
        setSuccess(response.message || "Email sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 max-w-[500px]" onSubmit={handleSubmit}>
      <div className="flex max-[400px]:flex-col items-center gap-3 w-full">
        <input
          className="input"
          name="name"
          placeholder="Name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          name="email"
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <input
        className="input"
        name="subject"
        placeholder="Subject"
        type="text"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <textarea
        className="input"
        name="message"
        placeholder="Message"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="text-black" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : success ? (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
