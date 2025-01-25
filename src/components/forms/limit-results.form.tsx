import { component$ } from "@builder.io/qwik";
import { useSelectResultsPerPage } from "~/routes";

export default component$(()=>{
    const action = useSelectResultsPerPage();
    return  <div class="flex items-center justify-center">
    <select
      class="select select-bordered max-w-xs"
      onChange$={async (_, el) => {
        await action.submit({ take: parseInt(el.value) });
      }}
    >
      <option disabled selected>
        Results Per Page
      </option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
    </select>
  </div>
})