import { component$ } from "@builder.io/qwik";
import { ProductList } from "~/components/lists/product.list";
import { useGetProducts } from "../layout";

export default component$(() => {
  const products = useGetProducts();
  return (
    <ul class="h-full bg-base-content p-6">
      <div class="grid grid-cols-2 justify-center gap-3 md:flex">
      <ProductList products={products} />
      </div>
    </ul>
  );
});
