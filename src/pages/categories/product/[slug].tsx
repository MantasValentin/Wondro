import { useRouter } from "next/router";
import { items } from "../../../utils/data";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import { Store } from "@/atoms/store";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilState } from "recoil";

const Product = () => {
  const [user, loading, error] = useAuthState(auth);
  const [modalState, setModalState] = useRecoilState(authModalState);
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { slug } = router.query;
  const product = items.find((x) => x.id === Number(slug));
  const [image, setImage] = useState(product?.img);
  const [quantity, setQuantity] = useState(0);

  const addToCartHandler = () => {
    if (quantity > 0) {
      const d = new Date();
      dispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity: quantity, purchaseId: Date.now() },
      });
    }
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
      <main className="h-fit min-h-full w-full p-8">
        {product && image ? (
          <>
            <div className="flex flex-row max-lg:flex-col gap-8">
              <div className="flex flex-col gap-8 basis-1/3">
                <div className="relative">
                  <Image
                    src={image.src}
                    alt={product.description}
                    width={image.width}
                    height={image.height}
                    className="w-full h-full object-cover max-2xl:max-h-[20rem] max-lg:max-h-[40rem] max-md:max-h-[22rem]  max-xs:max-h-[14rem]"
                  ></Image>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="relative border-2 border-black border-opacity-30 transition duration-300 hover:border-opacity-70">
                    <Image
                      src={product.img.src}
                      alt={product.description}
                      width={product.img.width}
                      height={product.img.height}
                      className="w-full h-full object-cover hover:cursor-pointer"
                      onMouseOver={() => setImage(product.img)}
                    ></Image>
                  </div>
                  <div className="relative border-2 border-black border-opacity-30 transition duration-300 hover:border-opacity-70">
                    <Image
                      src={product.otherImgs[0].src}
                      alt={product.description}
                      width={product.otherImgs[0].width}
                      height={product.otherImgs[0].height}
                      className="w-full h-full object-cover hover:cursor-pointer"
                      onMouseOver={() => setImage(product.otherImgs[0])}
                    ></Image>
                  </div>
                  <div className="relative border-2 border-black border-opacity-30 transition duration-300 hover:border-opacity-70">
                    <Image
                      src={product.otherImgs[1].src}
                      alt={product.description}
                      width={product.otherImgs[1].width}
                      height={product.otherImgs[1].height}
                      className="w-full h-full object-cover hover:cursor-pointer"
                      onMouseOver={() => setImage(product.otherImgs[1])}
                    ></Image>
                  </div>
                </div>
              </div>
              <div className="flex flex-col basis-2/3">
                <div className="flex flex-col h-fit bg-gray-200 p-8 gap-8 max-sm:gap-4">
                  <div className="text-center text-3xl max-sm:text-xl font-semibold">
                    {product.description}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-xl max-sm:text-base text-center max-w-4xl">
                      {product.specs}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex flex-1 items-center justify-between max-w-3xl">
                      <span className="flex items-center justify-center text-2xl max-sm:text-base font-semibold">
                        Quantity
                      </span>
                      <div className="flex flex-row items-center text-3xl max-sm:text-xl font-semibold">
                        <div
                          className="flex items-center justify-center border-[1px] border-r-0 border-black w-12 max-sm:w-8 h-12 max-sm:h-8 bg-white hover:bg-gray-200 transition hover:cursor-pointer"
                          onClick={() => {
                            if (quantity > 0) {
                              setQuantity(quantity - 1);
                            }
                          }}
                        >
                          -
                        </div>
                        <div className="flex items-center justify-center border-[1px] border-black w-12 max-sm:w-8 h-12 max-sm:h-8">
                          {quantity}
                        </div>
                        <div
                          className="flex items-center justify-center border-[1px] border-l-0 border-black w-12 max-sm:w-8 h-12 max-sm:h-8 bg-white hover:bg-gray-200 transition hover:cursor-pointer"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </div>
                      </div>
                      <span className="flex items-center justify-center text-2xl max-sm:text-base font-semibold">
                        {product.price}.00&euro;
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex flex-1 items-center justify-between max-w-3xl">
                      <div
                        className="text-2xl max-sm:text-base text-center px-4 py-2 max-sm:p-1 border-[1px] border-black bg-white font-semibold hover:cursor-pointer hover:bg-gray-900 hover:text-white active:scale-90 transition select-none"
                        onClick={addToCartHandler}
                      >
                        ADD TO CART
                      </div>
                      <div
                        className="text-2xl max-sm:text-base text-center px-4 py-2 max-sm:p-1 border-[1px] border-black bg-gray-900 text-white font-semibold hover:cursor-pointer hover:bg-white hover:text-black active:scale-90 transition select-none"
                        onClick={purchase}
                      >
                        BUY NOW
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row max-md:flex-col justify-between gap-8 pt-8">
                  <div className="flex-1 px-8 py-4 bg-gray-200 flex flex-col gap-1 text-center justify-center">
                    <span className="text-xl font-semibold">Texture:</span>{" "}
                    <span className="text-lg">{product.texture}</span>
                  </div>
                  <div className="flex-1 px-8 py-4 bg-gray-200 flex flex-col gap-1 text-center justify-center">
                    <span className="text-xl font-semibold">Weight:</span>{" "}
                    <span className="text-lg">{product.weight}</span>
                  </div>
                  <div className="flex-1 px-8 py-4 bg-gray-200 flex flex-col gap-1 text-center justify-center">
                    <span className="text-xl font-semibold">Size:</span>{" "}
                    <span className="text-lg">{product.size}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-2xl gap-8">
            Product does not exist
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
};

export default Product;
