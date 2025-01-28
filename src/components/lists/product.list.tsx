import { $, component$ } from "@builder.io/qwik";
import { List } from "./list";
import ProductCard from "../ui/cards/product.card";
import { type Product } from "@prisma/client";
import { useGetProducts } from "~/routes/layout";

export const ProductList = component$(() => {
     const products = useGetProducts();
   
    
    return (
      <List 
        items={products.value as Product[]}
        renderItem={$((product: Product) => <ProductCard product={product} />)}
        keyFn={$((product: Product) => Promise.resolve(product.id))}
      />
    );
  });