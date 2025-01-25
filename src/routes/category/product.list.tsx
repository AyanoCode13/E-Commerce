import { component$ } from "@builder.io/qwik";
import ProductCard from "~/components/ui/cards/product.card";
import { useGetProducts } from "../layout";

export default component$(() => {
  const products = useGetProducts();
  return (
    <ul class="h-full bg-base-content p-6">
      <div class="grid grid-cols-2 justify-center gap-3 md:flex">
        {products.value.map((product) => {
          return (
            <li key={product.id} class="flex items-center justify-center">
              <ProductCard
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.details?.price ?? 0}
                image={product.details?.images[0]}
                sessions={product.sessions}
                rating={product.details?.rating ?? 0}
              />
            </li>
          );
        })}
      </div>
    </ul>
  );
});
