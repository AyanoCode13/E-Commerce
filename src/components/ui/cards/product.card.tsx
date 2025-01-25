import { $, component$, useContext, useSignal, useStore } from "@builder.io/qwik";
import { BsHeartFill, BsPaletteFill } from "@qwikest/icons/bootstrap";
import { CartContext } from "~/components/context/cart.context.provider";
import { useRemoveFavoriteProduct, useSetFavoriteProduct } from "~/routes/category";
import { useSession } from "~/routes/plugin@auth";
import { remove } from './../../../server/data/models/Product';
import { useLocation, useNavigate } from "@builder.io/qwik-city";

type ProductCardProps = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  rating: number;
  sizes?: string[];
  image?: {
    url: string;
    alt: string;
  };
  sessions?: { id: string; createdAt: Date; updatedAt: Date; sessionToken: string; userId: string; expires: Date; }[];
};

const AddToCartButton = component$((product: ProductCardProps) => {
  const cardContext = useContext(CartContext);
  const handleAddProductToCart = $(async () => {
    await cardContext.addItem({
      id: product.id,
      name: product.name,
      description: product.description ?? undefined,
      price: product.price,
      quantity: 1,
      image: product.image?.url,
    });
  });

  return (
    <button class="btn-content btn btn-block" onClick$={handleAddProductToCart}>
      Add To Cart
    </button>
  );
});



export default component$((product: ProductCardProps) => {
  const session = useSession();
  const nav = useNavigate();
  const setFavoriteAction = useSetFavoriteProduct();
  const removeFavoriteAction = useRemoveFavoriteProduct();
  const isFavorite = useSignal<boolean>(false)

  const toggleFavorite = $(async ()=>{
   
   if(isFavorite.value){
      await removeFavoriteAction.submit({
        productId: product.id,
        userId: session.value?.user?.id,
      })
      isFavorite.value = false;
   }
    else{
        await setFavoriteAction.submit({
          productId: product.id,
          userId: session.value?.user?.id,
        });
      isFavorite.value = true;
    }

  })

  return (
    <div class="card card-compact bg-base-100 shadow-2xl lg:w-96">
      <figure class=" border-collapse">
        <img
          src={product.image?.url}
          width={400}
          height={400}
          alt={product.image?.alt}
          class="h-48 lg:h-96 "
          loading="eager"
        />
      </figure>
      <div class="card-body">
        <div class="flex items-center justify-between">
          <button
            class="flex justify-start"
            onClick$={toggleFavorite}
          >
            <BsHeartFill color={isFavorite.value ?  "red":""} />
          </button>
          <span class="flex gap-1">
            {["black", "brown"].map((color) => {
              return <BsPaletteFill color={color} key={color} />;
            })}
          </span>
        </div>

        <h2 class="card-title">{product.name}</h2>
        <ul class="flex gap-2">
          <p>Sizes:</p>
          {product.sizes &&
            product.sizes[0] + " - " + product.sizes[product.sizes.length - 1]}
        </ul>

        <div class="flex flex-col gap-2">
          <div class="flex">
            <p>Price:</p>
            <div class="card-subtitle">
              <p class="justify-end">${product.price}</p>
            </div>
          </div>
          <div class="flex items-center">
            <p>Rating:</p>
            <div class="rating rating-xs">
              {Array.from({ length: product.rating }).map((_, index) => {
                return (
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <p>{product.description}</p>
        <div class="card-actions justify-end">
          <AddToCartButton {...product}/>
        </div>
      </div>
    </div>
  );
});
