import { component$ } from "@builder.io/qwik";
import { List } from "./list";
import ProductCard from "../ui/cards/product.card";
import { type Product } from "@prisma/client";

export const ProductList = component$((props: { products: Product[] }) => {
    const { products } = props;
    
    return (
      <List 
        items={products}
        renderItem={(product) => (
          <ProductCard product={product} />
        )}
        keyFn={(product) => product.id}
       
      />
    );
  });