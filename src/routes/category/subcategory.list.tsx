import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { useGetSubCategories } from "../layout";




export default component$(() => {
    const subCategories = useGetSubCategories();
    const location = useLocation();
  
    return (
      <ul class="menu menu-horizontal flex justify-evenly bg-base-200">
        {subCategories.value.map((subcategory) => {
          return (
            <li key={subcategory.id} class="menu-item">
              <a
                href={
                  "/category?id=" +
                  location.url.searchParams.get("id") +
                  "&subcategory=" +
                  subcategory.id +
                  "&page=1&take=5"
                }
              >
                {subcategory.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  });