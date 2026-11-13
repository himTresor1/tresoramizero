# Tresor Amizero — portfolio site

Next.js 16 · Tailwind 4 · motion · Lenis. The portfolio site for Tresor Amizero: a scroll-driven layout with its own motion system, filled with Tresor's content.

## Run

```bash
npm install
npm run dev -- -p 3200
```

Production: `npm run build && npm start`. Deploys to Vercel as-is (no env vars, no backend).

## Contact form delivery

The form on `/contact` posts to [Web3Forms](https://web3forms.com), which emails each submission to the address the access key was issued for. Set the key as `NEXT_PUBLIC_WEB3FORMS_KEY` (copy `.env.local.example` to `.env.local` locally; on Vercel add it under Settings → Environment Variables). Without a key the form opens the visitor's mail app instead.

## Where things live

| What | Where |
|---|---|
| Copy: name, roles, intro, email, socials | `content/profile.ts` |
| Service groups | `content/services.ts` |
| Case studies, archive list | `content/projects.ts` |
| Testimonials (placeholders flagged), trust strip names | `content/testimonials.ts` |
| About page copy, experience rows, facts | `content/about.ts` |
| Every image (with `placeholder: true` where a stand-in is used) | `content/media.ts` → files in `public/media/` |
| Design tokens (light + dark) | `styles/tokens.css` |
| Type roles and all component styles | `app/globals.css` |
| Motion values | `lib/motion.ts` |

## Swapping images

Replace the file in `public/media/` (keep the path, or edit the `src` in `content/media.ts`) and remove `placeholder: true`. Sizes the layout expects:

- `hero` 1440×900 (desktop, `object-position: 50% 100%`), `heroMobile` 780×1620 (under 810px)
- `footer` 1440×900 (5% overscan is applied)
- project `cover` 1600×1000 (also used in the cards and the index); gallery images 1600×1000 (shown in 1440×900 frames)
- `portraitSmall` 64×96 (About), `aboutImage` 1440×1080, `aboutQuoteImage` 1440×1200 (shown at 34% on dark)
- avatars 128×128

## Image credits

The two Kigali photographs on `/about` are Creative Commons works, converted to monochrome in the site's palette:

- `about-frame.webp` — [Kigali2018Cropped.jpg](https://commons.wikimedia.org/wiki/File:Kigali2018Cropped.jpg) by Adrien K, CC BY 2.0.
- `about-quote.webp` — [High Angle View Of Kigali City Street on November 29, 2018](https://commons.wikimedia.org/wiki/File:High_Angle_View_Of_Kigali_City_Street_on_November_29,_2018._Emmanuel_Kwizera.jpg) by Emmanuel Kwizera, CC BY-SA 4.0.

## Adding a project

Add an entry to `projects` in `content/projects.ts` with `published: true`, its images in `content/media.ts`, and it appears in the home stack, `/projects`, the project page (`/projects/<slug>`) and the "More Projects" grid. Entries with `published: false` stay out; earlier work goes in `archiveProjects` ("Old projects" on `/projects`).

## Social links

`profile.socials` entries with an empty `url` are not rendered (hero, footer, contact). Fill in the real handles.

## Contact form

There is no backend: submitting composes an email to `profile.email` in the visitor's mail client. Swap `ContactForm` for a form service (Formspree, Resend route) if a server-side inbox is wanted.

## Checks

- `npx tsc --noEmit` and `npx eslint .` must be clean.
