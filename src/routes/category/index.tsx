import { component$, useContext } from "@builder.io/qwik";
import { routeAction$, routeLoader$, useNavigate, z, zod$ } from "@builder.io/qwik-city";

import { CartContext } from "~/components/context/cart.context.provider";
import categoryController from "~/server/controllers/categoryController";
import productController from "~/server/controllers/productController";
import { getNumberOfPages } from "~/server/data/models/Product";
import Filters from "./filters";
import ProductList from "./product.list";
import SubcategoryList from "./subcategory.list";

export const useGetProducts = routeLoader$(async ({ url }) => {
  return await productController.getProductsByCategory(
    url.searchParams.get("subcategory")!,
  );
});

export const useGetMainCategories = routeLoader$(async () => {
  return categoryController.getRootCategories();
});

export const useGetSubCategories = routeLoader$(async ({ url }) => {
  return await categoryController.getSubCategories(url.searchParams.get("id")!);
});

export const useGetResultPages = routeLoader$(async ({ url }) => {
  return await getNumberOfPages({
    categoryId: url.searchParams.get("subcategory")!,
    take: parseInt(url.searchParams.get("take")!),
    page: parseInt(url.searchParams.get("page")!),
  });
});


export const useSetFavoriteProduct = routeAction$(async (data, request)=>{
  try{
    const session = request.cookie.get('auth.session.token');
  if (!session?.value) {
    throw request.redirect(302, '/auth/login');
  }
    const sessionToken = session.value as string;

    // const result = await prismaClient.session.update({
    //   where:{
    //     sessionToken:sessionToken
    //   },
    //   data:{
    //     products:{
    //       connect:{
    //         id:data.productId as string,
    //       },
    //     }
    //   }
    // })
    // return {
    //   success:true,
    //   data:result
    // }
  
  }catch(e){
    return {
      success:false,
      error:"Failed to add product to favorites"
    }
  }

})

export const useRemoveFavoriteProduct = routeAction$(async (data, { cookie, redirect })=>{
  const isAuth = cookie.get("authjs.session-token")?.value
  console.log(isAuth);
  if (!isAuth){
    throw redirect(302,"/auth/login")
  }
  // return await prismaClient.session.update({
  //   where:{
  //     sessionToken:cookie.get("authjs.session-toke0n")?.value as unknown as string,
  //   },
  //   data:{
  //     products:{
  //       disconnect:{
  //         id:data.productId as string,
  //       },
  //     }
  //   }
  // })
})

export const useCheckout = routeAction$(
  async (products) => {
    console.log("ACtion");
    console.log(products);
    const items = products.map((product) => {
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    });
    // const session = await stripeClient.checkout.sessions.create({
    //   payment_method_types: ["card", "klarna"],
    //   line_items: items,
    //   mode: "payment",
    //   success_url: "http://localhost:5173",
    //   cancel_url: "http://localhost:5173",
    //   billing_address_collection: "required",
    //   automatic_tax: {
    //     enabled: true,
    //   },
    // });
    // console.log(session);
    // return {
    //   ststus: "success",
    //   session,
    // };
  },

  zod$(
    z.array(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number(),
        quantity: z.number(),
      }),
    ),
  ),
);

const MobileCart = component$(()=>{
  const context = useContext(CartContext)
  const checkout = useCheckout()
  const nav = useNavigate();

  return  <div class="md:hidden w-full flex flex-col  justify-center items-center  bg-base-200 h-56">
  {context.cart.totalItems> 0 && <div class="flex bg-black p-6 rounded-full">
  <div class="indicator">
    <button onClick$={async ()=> {
      const res = await checkout.submit(context.cart.items)
                  
      //await nav(res.value.session!.url!) 
    }}>
    <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
    </button>
          
          <span class="badge indicator-item badge-sm">
            {context.cart.totalItems}
          </span>
        </div>
  </div>}
</div>
})

export default component$(() => {
  return (
    <div class="flex flex-col">
      <SubcategoryList />
      <Filters />
      <ProductList />
     <MobileCart/>
    </div>
  );
});
