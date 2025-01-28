import { $, component$ } from "@builder.io/qwik";
import { type Category } from "@prisma/client";
import { useGetSubCategories } from "~/routes/layout";
import { List } from "./list";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const location = useLocation();
  const subCategories = useGetSubCategories();
  console.log(subCategories.value);
  const RenderItems = $((category: Category) =>  <a
  href={
    "/category?id=" +
    location.url.searchParams.get("id") +
    "&subcategory=" +
    category.id +
    "&page=1&take=5"
  }
>
  {category.name}
</a>);
  const RenderKeys = $((category: Category) =>
    Promise.resolve(category.id),
  );
  return (
    <List
      items={subCategories.value as Category[]}
      renderItem={RenderItems}
      keyFn={RenderKeys}
      cls="menu menu-horizontal flex justify-evenly bg-base-200"
      itemCls="menu-item"
    />
  );
});
