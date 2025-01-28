import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  zod$
} from "@builder.io/qwik-city";
import AddProductForm from "~/components/forms/add-product.form";
import { addProductSchema } from "~/components/forms/validators/product.schema";
import { add } from "~/server/data/models/Product";


export const useAddProduct = routeAction$(
  async ({name, description, price, images}) => {
    
    const info = {
      name: name,
      description: description,
      price: parseFloat(price),
    }
    await add({data:info, images:images});

    return {
      success: true,
      message: "Product added successfully",
    };
  
  },

  zod$(addProductSchema),
);



export default component$(() => {
  return <AddProductForm />;
})