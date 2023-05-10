import { Store } from "@/atoms/store";
import Layout from "@/components/Layout";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Shipping: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // if user logs out then they are sent to the start page\
  useEffect(() => {
    if (user) {
    } else {
      router.push("/");
    }
  }, [user]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { ...shippingAddress },
    });
    router.push("/payment");
  };

  const onChange = (e: any) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      <main className="flex justify-center min-h-full h-fit">
        <div className="max-w-5xl">
          <div className="text-2xl font-semibold p-8">Shipping Address</div>
          <form
            className="flex flex-col text-xl"
            onSubmit={(e) => submitHandler(e)}
          >
            <label htmlFor="fullName" className="pb-1 font-semibold">
              Full Name
            </label>
            <input
              className="mb-4 border border-gray-300 rounded-md shadow-sm opacity-70 focus:outline-none focus:opacity-100 hover:opacity-100 py-1 px-2"
              id="fullName"
              name="fullName"
              type="text"
              onChange={onChange}
              required
            ></input>
            <label htmlFor="address" className="pb-1 font-semibold">
              Address
            </label>
            <input
              className="mb-4 border border-gray-300 rounded-md shadow-sm opacity-70 focus:outline-none focus:opacity-100 hover:opacity-100 py-1 px-2"
              id="address"
              name="address"
              type="text"
              onChange={onChange}
              required
            ></input>
            <label htmlFor="city" className="pb-1 font-semibold">
              City
            </label>
            <input
              className="mb-4 border border-gray-300 rounded-md shadow-sm opacity-70 focus:outline-none focus:opacity-100 hover:opacity-100 py-1 px-2"
              id="city"
              name="city"
              type="text"
              onChange={onChange}
              required
            ></input>
            <label htmlFor="postalCode" className="pb-1 font-semibold">
              Postal Code
            </label>
            <input
              className="mb-4 border border-gray-300 rounded-md shadow-sm opacity-70 focus:outline-none focus:opacity-100 hover:opacity-100 py-1 px-2"
              id="postalCode"
              name="postalCode"
              type="text"
              onChange={onChange}
              required
            ></input>
            <label htmlFor="country" className="pb-1 font-semibold">
              Country
            </label>
            <input
              className="mb-4 border border-gray-300 rounded-md shadow-sm opacity-70 focus:outline-none focus:opacity-100 hover:opacity-100 py-1 px-2"
              id="country"
              name="country"
              type="text"
              onChange={onChange}
              required
            ></input>
            <button className="text-xl text-center px-4 py-2 rounded-full border-[1px] border-black bg-white text-black font-semibold hover:cursor-pointer hover:bg-gray-900 hover:text-white active:scale-90 transition select-none">
              Next
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Shipping;
