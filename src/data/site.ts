import type { Achievement, SocialLink } from "@/types/content";

const configuredUrl = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE = {
  name: "Shine Akhanda",
  shortName: "Shine Akhanda",
  url: (configuredUrl || "https://shineakhanda.dev").replace(/\/$/, ""),
  title: "Web Developer & Digital Marketing Expert",
  tagline: "Web development is my profession; system administration is my passion.",
  description:
    "Shine Akhanda is a web developer, digital marketing expert, and founder of Cave Technologies in Mymensingh, Bangladesh. He builds business websites and helps organizations grow online.",
  location: {
    city: "Mymensingh",
    country: "Bangladesh",
    display: "Mymensingh, Bangladesh",
  },
  phone: {
    display: "+8801302776234",
    href: "tel:+8801302776234",
    e164: "+8801302776234",
  },
  email: {
    display: "me@shineakhanda.dev",
    href: "mailto:me@shineakhanda.dev",
  },
  company: {
    name: "Cave Technologies",
    role: "Founder & CEO",
    description:
      "Cave Technologies is a business-building agency focused on websites, digital marketing, online advertising, and sustainable digital growth.",
  },
  portrait: {
    src: "/images/shine-akhanda-portrait.webp",
    fallback: "/images/shine-akhanda.jpg",
    alt: "Illustrated portrait of Shine Akhanda, web developer and founder of Cave Technologies",
    width: 512,
    height: 512,
  },
  defaultImage: "/images/og-default.jpg",
  defaultImageAlt: "Shine Akhanda — web developer and digital marketing expert in Bangladesh",
  currentYear: 2026,
  languages: ["English", "Bangla"],
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://fb.me/shine1920.me",
    icon: "facebook",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/shine1920e",
    icon: "x",
  },
  {
    label: "GitHub — Shine Akhanda",
    href: "https://github.com/shineakhanda4",
    icon: "github",
  },
  {
    label: "GitHub — Cave Technologies",
    href: "https://github.com/caveweb1920",
    icon: "github-cave",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shineakhanda",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@lws-1920",
    icon: "youtube",
  },
  {
    label: "Discord",
    href: "https://discord.com/users/1289181620653396100",
    icon: "discord",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    value: "25+",
    label: "Client projects shipped",
    detail: "Websites and digital work for clinics, studios, schools, shops and manufacturers.",
  },
  {
    value: "7+",
    label: "Businesses helped sell more",
    detail: "Marketing planned around real budgets and measured in enquiries, not likes.",
  },
  {
    value: "4",
    label: "Live sites you can visit",
    detail: "Architecture, healthcare, education and manufacturing, all online today.",
  },
  {
    value: "1",
    label: "Agency founded",
    detail: "Cave Technologies, built to help Bangladeshi businesses get online and grow.",
  },
];

/*
  The practice as three layers, top to bottom: what visitors see, how they
  arrive, and what keeps it all running. The order is meaningful.
*/
export const EXPERTISE = [
  {
    number: "01",
    layer: "What people see",
    title: "Web development",
    body: "Fast, clear websites in React, TypeScript and Next.js, shaped around what the business needs a visitor to understand and do.",
    href: "/services/website-development",
    linkLabel: "Website development",
  },
  {
    number: "02",
    layer: "How they find you",
    title: "Digital marketing",
    body: "Search, social and paid campaigns with a clear goal and a sensible budget, judged by enquiries and sales rather than vanity numbers.",
    href: "/services/digital-marketing",
    linkLabel: "Digital marketing",
  },
  {
    number: "03",
    layer: "What keeps it running",
    title: "Linux infrastructure",
    body: "Bare-metal servers, Linux administration and recovery: the quiet layer that decides whether the site is up when a customer arrives.",
    href: "/services/linux-infrastructure",
    linkLabel: "Linux infrastructure",
  },
] as const;

export const PRINCIPLES = [
  {
    title: "The business comes first",
    body: "A website is a working asset. Clarity, trust and a clear next step matter more than another animation.",
  },
  {
    title: "Simple systems last longer",
    body: "I pick tools a business can keep running without me: maintainable code, honest content, no unnecessary moving parts.",
  },
  {
    title: "Speed is part of the design",
    body: "Fast pages, accessible interfaces, sensible image sizes and stable layouts are decided up front, not patched in later.",
  },
  {
    title: "Own the whole problem",
    body: "Content, DNS, email, search visibility and server recovery are all part of the job. The useful work rarely stops at the browser.",
  },
] as const;
