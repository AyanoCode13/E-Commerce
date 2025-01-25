import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import CartContextProvider from "~/components/context/cart.context.provider";

import IndexNavbar from "~/components/ui/navbars/index.navbar";
import categoryController from "~/server/controllers/categoryController";
import productController from "~/server/controllers/productController";
import { getNumberOfPages } from "~/server/data/models/Product";



export const useGetProducts = routeLoader$(async ({ url }) => {
  return await productController.getProductsByCategory(url.searchParams.get("subcategory")!);
  
});

export const useGetMainCategories = routeLoader$(async () => {
  return categoryController.getRootCategories(); 
});

export const useGetSubCategories = routeLoader$(async ({ url }) => {
  return categoryController.getSubCategories(url.searchParams.get("category")!);
  
});

export const useGetResultPages = routeLoader$(async ({ url }) => {
  return await getNumberOfPages({
    categoryId: url.searchParams.get("subcategory")!,
    take: parseInt(url.searchParams.get("take")!),
    page: parseInt(url.searchParams.get("page")!),
  });
});


export default component$(() => {
  
  return (
    <CartContextProvider>
    <IndexNavbar>
      <Slot />
     
    </IndexNavbar>

  </CartContextProvider>
  );
});
