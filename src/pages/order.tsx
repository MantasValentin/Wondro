import Layout from "@/components/Layout";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useContext, useEffect } from "react";
import { Store } from "@/atoms/store";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { getDatabase, ref, set } from "firebase/database";

interface Item {
  id: number;
  category: string;
  img: StaticImageData;
  description: string;
  price: number;
  otherImgs: StaticImageData[];
  specs: string;
  texture: string;
  weight: string;
  size: string;
  quantity: number;
  purchaseId: number;
}

const Order: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const itemPrice: number = state.cart.cartItems.reduce(
    (total: number, item: Item) => {
      return total + item.price * item.quantity;
    },
    0
  );
  const totalPrice =
    itemPrice + Math.round(itemPrice * 0.15) + (itemPrice > 200 ? 0 : 15);

  // if user logs out then they are sent to the start page
  useEffect(() => {
    if (user) {
    } else {
      router.push("/");
    }
  }, [user]);

  const writeUserData = () => {
    const db = getDatabase();
    const d = new Date(Date.now());
    const id = Math.floor(Math.random() * 10000);
    set(ref(db, "users/" + user?.uid + "/" + id), {
      shippingAddress: state.cart.shippingAddress,
      paymentOption: state.cart.paymentMethod,
      order: state.cart.cartItems,
      total: totalPrice,
      date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
      id: id,
    });
  };

  // adds the order to the database and deletes all data in the cart
  const placeOrder = () => {
    writeUserData();
    dispatch({
      type: "CART_DELETE_ALL",
      payload: {},
    });
    router.push("/");
  };

  return (
    <Layout>
      <main className="flex flex-col min-h-full h-fit px-40 py-6 max-xl:p-6 gap-8">
        {state.cart.cartItems.length ? (
          <>
            <div className="text-2xl font-semibold">Place Order</div>
            <div className="flex flex-row max-md:flex-col gap-8">
              <div className="flex flex-1 flex-col h-fit bg-gray-200 px-8 py-4 gap-8">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-xl font-semibold">
                    Shipping Address
                  </div>
                  <div className="text-lg">
                    {state.cart.shippingAddress.fullName},{" "}
                    {state.cart.shippingAddress.address},{" "}
                    {state.cart.shippingAddress.city},{" "}
                    {state.cart.shippingAddress.postalCode},{" "}
                    {state.cart.shippingAddress.country}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-xl font-semibold">
                    Payment Method
                  </div>
                  <div>{state.cart.paymentMethod}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-xl font-semibold">
                    Order Items
                  </div>
                  <div className="flex flex-row text-xl max-sm:text-lg font-semibold">
                    <div className="flex items-center basis-2/5">Item</div>
                    <div className="flex items-center justify-center basis-1/5">
                      Quantity
                    </div>
                    <div className="flex items-center justify-center basis-1/5">
                      Price
                    </div>
                    <div className="flex items-center justify-center basis-1/5">
                      Subtotal
                    </div>
                  </div>
                  {state.cart.cartItems.map((item: Item) => {
                    return (
                      <div
                        className="flex flex-row text-xl max-sm:text-base"
                        key={item.purchaseId}
                      >
                        <div className="flex items-center basis-2/5 gap-4">
                          <div className="relative max-w-[4rem] border-[1px] border-black border-opacity-30 transition duration-300 hover:border-opacity-70 max-lg:hidden">
                            <Image
                              src={item.img.src}
                              alt={item.description}
                              width={item.img.width}
                              height={item.img.height}
                              className="w-full h-full object-cover bg-white"
                            ></Image>
                          </div>
                          <div className="">{item.description}</div>
                        </div>
                        <div className="flex items-center justify-center basis-1/5">
                          {item.quantity}
                        </div>
                        <div className="flex items-center justify-center basis-1/5">
                          {item.price}.00&euro;
                        </div>
                        <div className="flex items-center justify-center basis-1/5">
                          {item.quantity * item.price}.00&euro;
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col h-fit min-w-[20rem] bg-gray-200 px-8 py-4 gap-4">
                <div className="flex justify-center items-center text-2xl font-semibold">
                  Order Summary
                </div>
                <div className="flex justify-between text-xl">
                  <div>Items</div>
                  <div>{itemPrice}.00&euro;</div>
                </div>
                <div className="flex justify-between text-xl">
                  <div>Tax</div>
                  <div>{Math.round(itemPrice * 0.15)}.00&euro;</div>
                </div>
                <div className="flex justify-between text-xl">
                  <div>Shipping</div>
                  <div>{itemPrice > 200 ? 0 : 15}.00&euro;</div>
                </div>
                <div className="flex justify-between text-xl">
                  <div>Total</div>
                  <div>
                    {totalPrice}
                    .00&euro;
                  </div>
                </div>
                <button
                  className="text-xl text-center px-4 py-2 border-[1px] border-black bg-gray-900 text-white font-semibold hover:cursor-pointer hover:bg-white hover:text-black active:scale-90 transition select-none"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </main>
    </Layout>
  );
};

export default Order;
