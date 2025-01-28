import { component$, Slot } from "@builder.io/qwik";

import CategoryList from "~/components/lists/category.list";




const NavbarCenter = component$(() => {
  return (
    <div class="hidden flex-none lg:block">
      <CategoryList/>
    </div>
  );
});

// const NavbarEnd = component$(() => {
//   const cartContext = useContext(CartContext);
//   const checkout = useCheckout();
//   const nav = useNavigate();


//   const Avatar = component$(() => {
//     const session = useSession();
//     return (
//       <div class="dropdown dropdown-end">
//         <div tabIndex={0} role="button" class="avatar btn btn-circle btn-ghost">
//           <div class="w-10 rounded-full">
//             <img
//               width="844"
//               height="844"
//               alt="Tailwind CSS Navbar component"
//               src={session.value?.user?.image ?? ""}
//             />
//           </div>
//         </div>
//         <ul
//           tabIndex={0}
//           class="dropdown-content menu menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
//         >
//           <li>
//             <a class="justify-between">Profile</a>
//           </li>
//           <li>
//             <a>Settings</a>
//           </li>
//           <li>
//             <a>Logout</a>
//           </li>
//         </ul>
//       </div>
//     );
//   });

//   return (
//     <div class="navbar-end items-center">
//       <div class="md:flex md:flex-row items-center">
//         <div class="hidden md:dropdown-bottom md:dropdown ">
//            {cartContext.cart.totalItems > 0 && <div tabIndex={0} role="button" class="btn btn-circle btn-ghost">
             
//               <div class="indicator">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   class="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <span class="badge indicator-item badge-sm">
//                   {cartContext.cart.totalItems}
//                 </span>
//               </div>
            
//           </div>}
//           <div class="dropdown-content absolute right-0 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ">
//             <div class="bg-base-100 p-4 shadow-md">
//               {/* Cart Items */}
//               {cartContext.cart.items.length > 0 ? (
//                 <ul class="space-y-4">
//                   {cartContext.cart.items.map((item) => (
//                     <li
//                       key={item.id}
//                       class="flex items-center justify-between border-b py-2"
//                     >
//                       <div class="flex items-center space-x-3">
//                         {/* Product Image */}
                       
//                         <div>
//                           <p class="font-semibold">{item.name}</p>
//                           <p class="text-sm text-gray-600">${item.price}</p>
//                           <div class="mt-1 flex items-center space-x-2">
//                             {/* Decrease Quantity Button */}
//                             <button
//                               class="btn btn-outline btn-error btn-xs"
//                               onClick$={async() => {
//                                 console.log(item.id)
//                                 await cartContext.decreaseItem(item.id)
//                               }}
//                             >
//                               -
//                             </button>
//                             {/* Item Quantity */}
//                             <span class="font-semibold">{item.quantity}</span>
//                             {/* Increase Quantity Button */}
//                             <button
//                               class="btn btn-outline btn-success btn-xs"
//                               onClick$={async() => await cartContext.increaseItem(item.id)}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                       <button
//                         class="btn btn-error btn-xs"
//                         onClick$={async () => await cartContext.removeItem(item.id)}
//                       >
//                         <BsTrash/>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p class="text-center">Your cart is empty</p>
//               )}
//               <div>
//                 Total:{cartContext.cart.total}
//               </div>

//               {/* Checkout Button */}
//               <div class="mt-4">
//                   <button class="btn btn-success w-full" onClick$={async()=>{
//                     const res = await checkout.submit(cartContext.cart.items)
                  
//                   await nav(res.value.session!.url!)  
                  
//                   }}>Checkout</button>
//                 </div>
//             </div>
//           </div>
//         </div>
//         {<Avatar />}
//       </div>
//     </div>
//   );
// });

// const Sidebar = component$(() => {
//   return (
//     <div class="drawer-side">
//       <label
//         for="my-drawer-3"
//         aria-label="close sidebar"
//         class="drawer-overlay"
//       ></label>
      
//     </div>
//   );
// });

export default component$(() => {
  return (
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col"  >
        {/* Navbar */}
        <div class="navbar w-full bg-base-300">
          <div class="navbar-start">
            <div class="flex-none lg:hidden">
              <label
                for="my-drawer-3"
                aria-label="open sidebar"
                class="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div class="mx-2 flex-1 px-2">Navbar Title</div>
          </div>
          <dov class=" navbar-center">
            <NavbarCenter />
          </dov>
          <div class="navbar-end">
            {/* <NavbarEnd /> */}
          </div>
        </div>
        {/* Page content here */}
        <Slot />
      </div>
      {/* <Sidebar /> */}
    </div>
  
  );
});
