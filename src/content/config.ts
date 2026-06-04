import { defineCollection, z } from 'astro:content';

const hotels = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    region: z.enum(['phuket', 'samui', 'bangkok', 'chiangmai']),
    tags: z.array(z.string()),
    priceMin: z.number(),
    priceMax: z.number(),
    badgeText: z.string(),
    headerGradient: z.string(),
    badgeBg: z.string(),
    badgeColor: z.string(),
    priceUnit: z.string().default('泰铢/晚'),
    coverImage: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { hotels };
