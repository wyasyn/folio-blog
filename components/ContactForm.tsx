"use client";
import { sendEmail } from "@/lib/resend";
import React, { useState } from "react";
import { z } from "zod";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(50),
  email: z.string().email("Invalid email address").max(50),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(50),
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
  const [status, setStatus] = useState<string | null>(null);

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
      setStatus(errorMessage);
      return;
    }

    try {
      const response = await sendEmail(formData);
      if (response.error) {
        setStatus(response.error);
      } else {
        setStatus(response.message || "Email sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setStatus("An unexpected error occurred. Please try again later.");
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
      <button type="submit" className="submit-btn">
        Submit
      </button>
      {status && <p className="status-message">{status}</p>}
    </form>
  );
}
