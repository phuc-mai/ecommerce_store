import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const existingItem = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );

        if (existingItem) {
          return toast("Item already in cart.");
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart.");
      },
      removeItem: (_id: string) => {
        const newItems = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== _id
        );
        set({ cartItems: newItems });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ cartItems: [] }),
      increaseQuantity: (_id: string) => {
        const newItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        set({ cartItems: newItems });
        toast("Quantity increased.");
      },
      decreaseQuantity: (_id: string) => {
        const newItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === _id
            ? {
                ...cartItem,
                quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1,
              }
            : cartItem
        );
        set({ cartItems: newItems });
        toast("Quantity decreased.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
