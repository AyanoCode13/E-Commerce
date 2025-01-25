import {
  $,
  component$,
  createContextId,
  type QRL,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";

type CartItem = {
  id: string;
  name: string;
  description?: string | undefined;
  price: number;
  quantity: number | 0;
  image?: string;
}

type Cart = {
  items: Array<CartItem>;
  total: number;
  totalItems: number;
}

type CartContext = {
  cart: Cart;
  addItem: QRL<(item: CartItem) => void>;
  removeItem: QRL<(id: string) => void>;
  decreaseItem: QRL<(id: string) => void>;
  increaseItem: QRL<(id: string) => void>;
}

export const CartContext = createContextId<CartContext>("cart-context");

export default component$(() => {

  const cartStore = useStore<Cart>({
    items: Array<CartItem>(),
    total: 0,
    totalItems: 0,
  });

  const addItem = $(async (item: CartItem) => {
    const existingItem = cartStore.items.find((i) => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartStore.items.push(item);
    }
    cartStore.totalItems += 1;
    cartStore.total += item.price;
  });
  const increaseItem = $(async (id: string) => {
    const existingItem = cartStore.items.find((i) => i.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
      cartStore.totalItems += 1;
      cartStore.total += existingItem.price;
    }
  });

  const decreaseItem = $(async (id: string) => {
    const existingItem = cartStore.items.find((i) => i.id === id);
    console.log(id);
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity -= 1;
      cartStore.totalItems -= 1;
      cartStore.total -= existingItem.price;
    }
    if (existingItem && existingItem.quantity === 0) {
      cartStore.items = cartStore.items.filter((i) => i.id !== existingItem.id);
    }
  });
  const removeItem = $((id: string) => {
    const item = cartStore.items.find((i) => i.id === id);
    if (item) {
      cartStore.items = cartStore.items.filter((i) => i.id !== id);
      cartStore.total -= item.price * item.quantity;
      cartStore.totalItems -= item.quantity;
    }
  });

  useContextProvider(CartContext, {
    cart: cartStore,
    addItem,
    removeItem,
    decreaseItem,
    increaseItem,
  });

  return <Slot />;
});
