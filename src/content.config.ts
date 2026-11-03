import {defineCollection} from "astro:content";
import {glob} from "astro/loaders";
import {z} from "zod";

const work = defineCollection({
  loader: glob({pattern: "**/*.md", base: "./src/content/work"}),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    client: z.string(),
    category: z.string(),
    summary: z.string(),
    role: z.string(),
    context: z.string(),
    outcome: z.string(),
    tags: z.array(z.string()),
    impact: z
      .array(z.object({value: z.string(), label: z.string()}))
      .optional(),
    order: z.number(),
    featured: z.boolean().default(false),
    visual: z.enum(["datahub", "onboarding", "lab", "research", "insuregpt"]),
    resources: z.array(z.object({label: z.string(), url: z.url()})).default([]),
    liveUrl: z.url().optional()
  })
});

export const collections = {work};
