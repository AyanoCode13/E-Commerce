import { z } from "@builder.io/qwik-city";

export const addProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string().optional().default("100"),
  images: z.array(
    z.object({
      url: z.string(),
      alt: z.string(),
    }),
  ),
});

export const cartProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string().optional(),
});

export const cartSchema = z.object({
  items: z.array(cartProductSchema),
  total: z.number(),
  totalItems: z.number(),
});
