import { component$ } from "@builder.io/qwik";

export default component$(() => {
  const sizes =  ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Brown", "Navy"]
  const priceRange = ["All", "Under 40", "50 - 80", "Over 80"];
  const rating =["ALL", "4", "4.5", "5"]
  
  return (
    <div class="flex w-full flex-col items-center p-2">
      <div class="flex flex-row overflow-x-scroll md:overflow-hidden w-full gap-1 lg:gap-3 md:justify-center py-2">
        <select class="select select-bordered max-w-xs">
          <option disabled selected>
           Price Range
          </option>
          {priceRange.map(price => (
            <option key={price}>{price}</option>
          ))}
        </select>
        <select class="select select-bordered max-w-xs">
          <option disabled selected>
            Size
          </option>
          {sizes.map(size => (
            <option value={size} key={size}>{size}</option>
          ))}
        </select>
        <select class="select select-bordered max-w-xs">
          <option disabled selected>
            Colors
          </option>
          {colors.map(color => (
            <option value={color} key={color}>{color.toUpperCase()}</option>
          ))}
        </select>
        <select class="select select-bordered max-w-xs">
          <option disabled selected>
            Rating
          </option>
         {
            rating.map(rate => (
              <option value={rate} key={rate}>{rate}</option>
            ))
         }
        </select>
        
      </div>
    </div>
  );
});
