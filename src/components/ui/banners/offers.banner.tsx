import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return  <div class="w-full overflow-x-auto scrollbar-hide">
    <div class="flex space-x-4 animate-marquee">
      <div class="w-64 h-40 bg-primary text-white flex items-center justify-center rounded-box">Item 1</div>
      <div class="w-64 h-40 bg-secondary text-white flex items-center justify-center rounded-box">Item 2</div>
      <div class="w-64 h-40 bg-accent text-white flex items-center justify-center rounded-box">Item 3</div>
      <div class="w-64 h-40 bg-primary text-white flex items-center justify-center rounded-box">Item 4</div>
      <div class="w-64 h-40 bg-secondary text-white flex items-center justify-center rounded-box">Item 5</div>
    </div>
  </div>
})