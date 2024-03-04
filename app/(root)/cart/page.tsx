"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";

const Cart = () => {
  const cart = useCart();
  const increaseQuantity = (id: string) => cart.increaseQuantity(id);
  const decreaseQuantity = (id: string) => cart.decreaseQuantity(id);
  const removeItem = (id: string) => cart.removeItem(id);

  const subTotal = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const subTotalRounded = parseFloat(subTotal.toFixed(2));
  const tax = parseFloat((subTotalRounded * 0.1).toFixed(2));
  const total = subTotalRounded + tax;

  const { user } = useUser();

  const customer = {
    clerkId: user?.id,
    name: user?.firstName + " " + user?.lastName,
    email: user?.emailAddresses[0].emailAddress,
  };

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        body: JSON.stringify({ cartItems: cart.cartItems, customer }),
      });

      const data = await res.json();
      window.location.href = data.url;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex gap-20 py-16 px-10">
        <div className="w-2/3">
          <h1 className="text-heading3-bold">Shopping Cart</h1>

          <hr className="my-6" />

          {cart.cartItems.map((cartItem) => (
            <div className="flex hover:bg-grey-1 px-6 py-5 justify-between items-center">
              <div className="flex items-center">
                <Image
                  width={100}
                  height={100}
                  className="rounded-lg w-32 h-32 object-cover"
                  src={cartItem.item.media[0]}
                  alt="product image"
                />
                <div className="flex flex-col gap-3 ml-4">
                  <p className="text-body-bold">{cartItem.item.title}</p>
                  {cartItem.color && (
                    <p className="text-small-medium">{cartItem.color}</p>
                  )}
                  {cartItem.size && (
                    <p className="text-small-medium">{cartItem.size}</p>
                  )}
                  <p className="text-body-bold">${cartItem.item.price}</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <MinusCircle
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => decreaseQuantity(cartItem.item._id)}
                />
                <p className="text-body-bold">{cartItem.quantity}</p>
                <PlusCircle
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => increaseQuantity(cartItem.item._id)}
                />
              </div>

              <Trash
                className="hover:text-red-1 cursor-pointer"
                onClick={() => removeItem(cartItem.item._id)}
              />
            </div>
          ))}
        </div>

        <div className="w-1/3 flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
          <h1 className="text-heading4-bold pb-4">
            Summary{" "}
            <span className="text-base-medium">{`(${cart.cartItems.length} ${
              cart.cartItems.length > 1 ? "items" : "item"
            })`}</span>
          </h1>
          <div className="flex justify-between text-body-semibold">
            <span className="text-grey-2">Subtotal</span>
            <span>${subTotal}</span>
          </div>
          <div className="flex justify-between text-body-semibold">
            <span className=" text-grey-2">Tax (10%)</span>
            <span>${tax}</span>
          </div>
          <hr />
          <div className="flex justify-between text-heading4-bold">
            <span>Total cost</span>
            <span>${total}</span>
          </div>
          <button
            className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
