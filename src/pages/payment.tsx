import Layout from "@/components/Layout";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect, useContext, useState } from "react";
import { Store } from "@/atoms/store";

const Payment: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { state, dispatch } = useContext(Store);
  const [paymentMethod, setPaymentMethod] = useState("");
  const router = useRouter();

  // if user logs out then they are sent to the start page
  useEffect(() => {
    if (user) {
    } else {
      router.push("/");
    }
  }, [user, router]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
    router.push("/order");
  };

  const onChange = (e: any) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Layout>
      <main className="flex justify-center min-h-full h-fit">
        <div className="max-w-5xl">
          <div className="text-2xl font-semibold p-8">Payment Method</div>
          <form
            className="flex flex-col text-xl gap-4"
            onSubmit={(e) => submitHandler(e)}
          >
            <div className="flex justify-between px-20">
              <label htmlFor="payPal">PayPal</label>
              <input
                type="radio"
                id="payPal"
                name="payment"
                value="PayPal"
                className="w-4"
                onChange={onChange}
                required
              ></input>
            </div>
            <div className="flex justify-between px-20">
              <label htmlFor="stripe">Stripe</label>
              <input
                type="radio"
                id="stripe"
                name="payment"
                value="Stripe"
                className="w-4"
                onChange={onChange}
                required
              ></input>
            </div>
            <div className="flex justify-between px-20">
              <label htmlFor="venmo">Venmo</label>
              <input
                type="radio"
                id="venmo"
                name="payment"
                value="Venmo"
                className="w-4"
                onChange={onChange}
                required
              ></input>
            </div>
            <button className="text-xl text-center px-4 py-2 rounded-full border-[1px] border-black bg-white text-black font-semibold hover:cursor-pointer hover:bg-gray-900 hover:text-white active:scale-90 transition select-none">
              Next
            </button>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default Payment;
