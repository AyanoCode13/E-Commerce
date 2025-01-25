import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  z,
  zod$,
  type DocumentHead
} from "@builder.io/qwik-city";
import LimitResultsForm from "~/components/forms/limit-results.form";
import { useGetResultPages } from "./layout";

export const useSelectResultsPerPage = routeAction$(
  ({ take }, { url }) => {
    url.searchParams.set("take", take.toString());
  },
  zod$(
    z.object({
      take: z.number(),
    }),
  ),
);

export const useChangePage = routeAction$(
  ({ page }, { url }) => {
    url.searchParams.set("page", page.toString());
  },
  zod$(
    z.object({
      page: z.number(),
    }),
  ),
);



const Pagination = component$(() => {
  
  const pages = useGetResultPages();
  const changePageAction = useChangePage();

  return (
    <div class="join bottom-0 justify-center">
      {Array.from({ length: pages.value }, (_, i) => {
        return (
          <button
            class="btn join-item"
            onClick$={async () => {
              await changePageAction.submit({ page: i + 1 });
            }}
            key={i}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
});

export default component$(() => {
  return (
    <main class="flex flex-col gap-2">
      <LimitResultsForm />

      <Pagination />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
