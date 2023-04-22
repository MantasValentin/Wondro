import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilState } from "recoil";
import { Store } from "@/atoms/store";
import Layout from "@/components/Layout";
import { auth } from "@/firebase/clientApp";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

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

export default function Cart() {
  const [user, loading, error] = useAuthState(auth);
  const { state, dispatch } = useContext(Store);
  const [modalState, setModalState] = useRecoilState(authModalState);
  const router = useRouter();
  const subTotal: number = state.cart.cartItems.reduce(
    (total: number, item: Item) => {
      return total + item.price * item.quantity;
    },
    0
  );

  const removeItem = (item: Item) => {
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  const purchase = () => {
    if (user) {
      router.push("/shipping");
    } else {
      setModalState({ ...modalState, show: true, view: "login" });
    }
  };

  return (
    <Layout>
      <main className="flex flex-col min-h-full h-fit px-40 py-6 max-xl:p-6 gap-8">
        {state.cart.cartItems.length > 0 ? (
          <>
            <div className="text-2xl font-semibold">Shopping Cart</div>
            <div className="flex flex-row max-md:flex-col gap-8">
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex flex-row text-xl max-sm:text-lg font-semibold">
                  <div className="flex items-center basis-2/5">Item</div>
                  <div className="flex items-center justify-center basis-1/5">
                    Quantity
                  </div>
                  <div className="flex items-center justify-center basis-1/5">
                    Price
                  </div>
                  <div className="flex items-center justify-center basis-1/5">
                    Action
                  </div>
                </div>
                {state.cart.cartItems.map((item: Item) => {
                  return (
                    <div
                      className="flex flex-row text-xl max-sm:text-base"
                      key={item.purchaseId}
                    >
                      <div className="flex items-center basis-2/5 gap-4">
                        <Link
                          href={`/categories/product/${item.id}`}
                          className="relative max-w-[4rem] border-[1px] border-black border-opacity-30 transition duration-300 hover:border-opacity-70 max-md:hidden"
                        >
                          <Image
                            src={item.img.src}
                            alt={item.description}
                            width={item.img.width}
                            height={item.img.height}
                            className="w-full h-full object-cover bg-white"
                          ></Image>
                        </Link>
                        <div className="">{item.description}</div>
                      </div>
                      <div className="flex items-center justify-center basis-1/5">
                        {item.quantity}
                      </div>
                      <div className="flex items-center justify-center basis-1/5">
                        {item.price}.00&euro;
                      </div>
                      <div className="flex items-center justify-center basis-1/5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 hover:cursor-pointer hover:scale-110 active:scale-95 transition"
                          onClick={() => removeItem(item)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col h-fit bg-gray-200 px-8 py-4 gap-4">
                <div className="flex justify-center items-center text-2xl font-semibold">
                  Subtotal: {subTotal}.00&euro;
                </div>
                <div
                  className="text-xl text-center px-4 py-2 border-[1px] border-black bg-gray-900 text-white font-semibold hover:cursor-pointer hover:bg-white hover:text-black active:scale-90 transition select-none"
                  onClick={purchase}
                >
                  CHECK OUT
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-2xl gap-8">
            Shopping Cart Empty
            <Link
              href={"/"}
              className="text-xl text-center px-4 py-2 border-[1px] border-black bg-gray-900 text-white font-semibold hover:cursor-pointer hover:bg-white hover:text-black active:scale-90 transition select-none"
            >
              RETURN
            </Link>
          </div>
        )}
      </main>
    </Layout>
  );
}
