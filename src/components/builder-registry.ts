import type { RegisteredComponent } from "@builder.io/sdk-qwik";
import ProductCard from "./ui/cards/product.card";

/**
 * This array is used to integrate custom components within Builder.
 * https://www.builder.io/c/docs/custom-components-intro
 *
 * These components will be found the "Custom Components"
 * section of Builder's visual editor.
 * You can also turn on "components only mode" to limit
 * editing to only these components.
 * https://www.builder.io/c/docs/guides/components-only-mode
 */
export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: ProductCard,
    name: "ProductCard",
    inputs: [
      {
        name: "description",
        type: "string",
      },
      {
        name: "image",
        type: "object",
        hideFromUI: true,
        meta: {
          ts: "{ url: string; alt: string; }",
        },
      },
      {
        name: "images",
        type: "object",
        hideFromUI: true,
        meta: {
          ts: "{ url: string; alt: string; }[]",
        },
      },
      {
        name: "name",
        type: "string",
        required: true,
      },
      {
        name: "price",
        type: "number",
        required: true,
      },
    ],
  },
];
