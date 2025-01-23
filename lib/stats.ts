import { Award, Clock, Users } from "lucide-react";

const yearsOfExp = new Date().getFullYear() - 2022;

export const stats = [
  {
    name: "years of experience",
    value: yearsOfExp,
    icon: Clock,
    color: "#83c60f",
    descriptions:
      "From startups to established brands, helping them achieve their digital gaols.",
  },
  {
    name: "Satisfied clients",
    value: 50,
    icon: Users,
    color: "#ff423f",
    descriptions:
      "Worked with a variety of clients from from startups to established brands helping them achieve their digital goals.",
  },
  {
    name: "Awards Achieved",
    value: yearsOfExp,
    icon: Award,
    color: "#319bec",
    descriptions:
      "Collaborative and client-focused, ensuring that every project reflects the unique vision.",
  },
];

export const FAQs = [
  {
    question: " What services do you offer?",
    answer:
      "I offer a range of services including web design, branding, digital marketing, UI/UX etc, each project is tailored to meet your unique needs and goals.",
  },
  {
    question: " How do I get started on a project with you?",
    answer:
      "I offer a range of services including web design, branding, digital marketing, UI/UX etc, each project is tailored to meet your unique needs and goals.",
  },
  {
    question: " Can you help with creative direction or ideas?",
    answer:
      "I offer a range of services including web design, branding, digital marketing, UI/UX etc, each project is tailored to meet your unique needs and goals.",
  },
  {
    question: " What is your pricing structure?",
    answer:
      "I offer a range of services including web design, branding, digital marketing, UI/UX etc, each project is tailored to meet your unique needs and goals.",
  },
  {
    question: " Do you work with international clients?",
    answer:
      "I offer a range of services including web design, branding, digital marketing, UI/UX etc, each project is tailored to meet your unique needs and goals.",
  },
];
