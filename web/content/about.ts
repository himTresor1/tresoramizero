/** About page copy. Facts and experience come from the resume; nothing is invented. */

export type Experience = { title: string; org: string; period: string; url?: string; summary: string[] };

export const about = {
  /** Lead paragraph (72px, scroll colour reveal). *accent* range marked with asterisks. */
  lead:
    "I’m a product designer with a strong foundation in software engineering, turning ideas into *intuitive, impactful digital products.* I work closely with founders, engineers and institutions to create systems that scale — from research and design systems to launch-ready interfaces.",
  columns: [
    "I trained at Rwanda Coding Academy in software development, embedded systems and cybersecurity, then moved into product design through real shipping work: a student-loan platform for the Development Bank of Rwanda, a management portal for the TVET Board, and the marketplace at GradPal.",
    "Most of my work sits where design meets engineering. Whether it’s a design system, a learning app or a government portal, I partner with the people building it and stay until it ships — fast and with intention.",
  ],
  cta: "Let’s Talk",
  /**
   * "// Experience" rows: role · organisation · period. Hovering a
   * row turns it accent and shows a card with the summary (from the resume) and the site link.
   */
  experience: [
    {
      title: "UX Designer",
      org: "IST Africa",
      period: "2026 – Present",
      summary: [
        "Designed user-centred, goal-driven experiences, starting with the learning app and expanding into teacher and parent tools.",
        "Contributed to and evolved the cross-product design system across IST’s ecosystem.",
        "Created and maintained high-fidelity designs and prototypes in Figma.",
      ],
    },
    {
      title: "Co-Founder, VP Marketing & Communication",
      org: "O2Labbs",
      period: "2025 – Present",
      summary: [
        "Co-founded a Rwandan tech firm building scalable digital products and software for external clients.",
        "Lead brand strategy, visual identity and public communication across products and services.",
        "Oversee UI/UX direction and work with engineering and product to turn business vision into digital solutions.",
      ],
    },
    {
      title: "Frontend Developer & UI/UX Designer",
      org: "GradPal",
      period: "2025 – Present",
      url: "https://gradpal.io/",
      summary: [
        "Front-end development of the GradPal Marketplace, an all-in-one platform to request academic help and share knowledge.",
        "Solo-created the UI/UX blueprint: wireframes and the high-fidelity design system.",
        "User and performance testing that helped the system handle 1,000+ users.",
      ],
    },
    {
      title: "Product Designer / Frontend Developer",
      org: "Development Bank of Rwanda",
      period: "2024 – 2026",
      url: "https://www.brd.rw/",
      summary: [
        "Designed MINUZA, streamlining student-loan management for 10,000+ students nationwide.",
        "Developed BRD Procurement, MINUZA, GIRIWAWE, TUGANE and other key projects.",
        "User testing reduced application processing time by 40%, speeding up student financial aid.",
      ],
    },
    {
      title: "Fullstack Engineer Intern",
      org: "MININFRA",
      period: "2024 – 2025",
      url: "https://www.mininfra.gov.rw/",
      summary: [
        "Developed KIVU-NAV-AID, real-time navigation assistance improving safety for 200+ vessels on Lake Kivu.",
        "Optimised performance, cutting load times by 25%.",
        "Worked with a team of six engineers to integrate APIs and backend services.",
      ],
    },
    {
      title: "Software Engineer",
      org: "EmissionLog (REMA)",
      period: "2024",
      url: "https://www.rema.gov.rw/home",
      summary: [
        "Contributed to EmissionLog, a greenhouse-gas management system for calculating and tracking emissions.",
        "Helped build the tools that support Rwanda’s compliance with its environmental goals and policies.",
      ],
    },
    {
      title: "UI/UX Designer / Frontend Developer",
      org: "Rwanda TVET Board",
      period: "2023 – 2024",
      url: "https://www.rtb.gov.rw/",
      summary: [
        "Designed the TVET Management Portal, streamlining administration for 4,800+ trainers.",
        "Initiated the UI for the country-wide e-Accreditation system for teacher applications.",
        "User research and testing lifted satisfaction by 30%; worked with a team of five developers on accessibility.",
      ],
    },
    {
      title: "Product Designer",
      org: "Rwanda Coding Academy",
      period: "2023 – 2024",
      url: "https://rca.ac.rw/",
      summary: [
        "Developed RCA-MIS, the official school management system: teacher and student management, marks and report generation.",
        "Automated committee voting, disciplinary actions and announcements, improving administrative efficiency.",
      ],
    },
  ] satisfies Experience[] as Experience[],
  /** Dark quote section (72px, white reveal on a dim image). */
  quote: "Clear interfaces for real problems — *built with the people who ship them,* and designed to hold up as the product grows.",
  /** "// Facts": the big number flips per block. */
  facts: [
    { number: "15k", title: "People Served", text: "MINUZA streamlines student loans for 10,000+ students nationwide; the TVET Management Portal supports 4,800+ trainers; GradPal’s marketplace now serves 1,000+ users." },
    { number: "08", title: "Products Shipped", text: "IST Legal, Script, MINUZA, BRD Procurement, GradPal, the TVET portal, the e-Accreditation system and RCA-MIS: designed, tested with users and built with the teams behind them." },
    { number: "03", title: "Years Designing", text: "From the first portal at Rwanda TVET Board in 2023 to the cross-product design system at IST Africa today — user research, testing and measurable results at every step." },
  ],
} as const;
