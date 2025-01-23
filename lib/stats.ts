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
    question: "What services do you offer?",
    answer:
      "I specialize in a wide range of services, including custom web design, branding, digital marketing, and UI/UX design. Every project is personalized to meet your specific needs and goals, ensuring high-quality, user-centric results.",
  },
  {
    question: "How do I get started on a project with you?",
    answer:
      "Getting started is simple! Just reach out via email or contact form. We’ll discuss your project needs, objectives, and vision. After understanding your requirements, I’ll provide a detailed proposal and timeline to move forward.",
  },
  {
    question: "Can you help with creative direction or ideas?",
    answer:
      "Absolutely! I’m passionate about brainstorming innovative ideas and guiding projects creatively. Whether you need branding inspiration, UI design concepts, or marketing strategies, I’m here to collaborate and turn your vision into reality.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "My pricing is flexible and tailored to each project based on its scope, complexity, and timeline. After an initial consultation, I’ll provide a transparent quote. I strive to offer great value for the quality and results delivered.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, I work with clients worldwide! With experience in remote collaboration, I use various communication and project management tools to ensure smooth, efficient workflows, no matter where you’re located.",
  },
];
