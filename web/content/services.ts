/** The four service groups. Order matters: engineering is last (decision D1). */

export type ServiceGroup = {
  title: string;
  description: string;
  items: string[];
};

export const services: ServiceGroup[] = [
  {
    title: "Product & UX Design",
    description:
      "User-centered, goal-driven experiences for web and mobile, from the first flow to the final screen.",
    items: [
      "User Research & Interviews",
      "Information Architecture",
      "Wireframing & User Flows",
      "High-Fidelity UI Design",
      "Mobile & Web Apps",
    ],
  },
  {
    title: "Design Systems",
    description:
      "Logical, scalable systems that keep every product in a family consistent, from tokens to components to documentation.",
    items: [
      "Design Tokens & Foundations",
      "Component Libraries",
      "Documentation & Guidelines",
      "Cross-Product Consistency",
    ],
  },
  {
    title: "Prototyping & Testing",
    description:
      "Interactive prototypes that answer real questions, tested with real users before a line of code is written.",
    items: [
      "Interactive Prototypes in Figma",
      "Usability Testing",
      "Interaction & Motion Design",
      "Iteration on Evidence",
    ],
  },
  {
    title: "Engineering",
    description:
      "I build what I design. Front-end work in React, Next.js and React Native so the shipped product matches the file.",
    items: [
      "React & Next.js",
      "React Native (Expo)",
      "Tailwind & Component Code",
      "Design-to-Code Handoff",
    ],
  },
];
