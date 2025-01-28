import { $, component$ } from "@builder.io/qwik";
import { type Category } from "@prisma/client";
import { useGetMainCategories } from "~/routes/layout";
import { List } from "./list";

export default component$(() => {
  const categories = useGetMainCategories();
  const RenderItems = $((category: Category) =>  <a href={"/category?id=" + category.id}>{category.name}</a>);
  const RenderKeys = $((category: Category) =>
    Promise.resolve(category.id),
  );
  return (
    <List
      items={categories.value as Category[]}
      renderItem={RenderItems}
      keyFn={RenderKeys}
      cls="menu menu-horizontal items-center"
      itemCls="menu-item"
    />
  );
});
