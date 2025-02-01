export interface AboutFormData {
  name: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  avatar?: string;
  techStack: {
    name: string;
    level: string; // e.g., Beginner, Intermediate, Advanced, Expert
  }[];
  hobbies: {
    name: string;
    details?: string;
  }[];
  languages: {
    name: string;
    fluency: string; // e.g., Basic, Conversational, Fluent, Native
  }[];
  experiences: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }[];
  educations: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
  }[];
  skills: {
    name: string;
    level: string;
  }[];
  socialLinks: {
    name: string;
    url: string;
  }[];
}
