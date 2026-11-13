/**
 * Real quotes only ship. The entries below are PLACEHOLDERS so the section can be
 * built and reviewed; they are flagged and must be replaced or the section hidden before launch.
 * Shape: quote (with *accent* range), name, role at company, avatar.
 */
export type Testimonial = { quote: string; name: string; role: string; avatar: string; placeholder?: boolean };

export const testimonials: Testimonial[] = [
  {
    quote: "“Tresor’s eye for detail and clear thinking *turned a vague brief into a product our users understood on the first screen.*”",
    name: "Client name",
    role: "Role, Company",
    avatar: "/media/avatars/01.svg",
    placeholder: true,
  },
  {
    quote: "“He designs *and* ships: the design system he set up is *still the backbone of how our team builds today.*”",
    name: "Client name",
    role: "Role, Company",
    avatar: "/media/avatars/02.svg",
    placeholder: true,
  },
  {
    quote: "“Fast, precise and calm under pressure. *Every review ended with a better product than we had planned.*”",
    name: "Client name",
    role: "Role, Company",
    avatar: "/media/avatars/03.svg",
    placeholder: true,
  },
];

/** Organisations Tresor has worked with, for the trust strip (text wordmarks until logos arrive). */
export const trustedBy = ["IST Africa", "BRD", "GradPal", "MININFRA", "Rwanda TVET Board", "O2Labbs", "REMA", "Rwanda Coding Academy"];
