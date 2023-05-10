import Layout from "@/components/Layout";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

interface Order {
  date: string;
  id: number;
  paymentOption: string;
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  order: any;
}

const UserProfile: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState<Order[]>();
  const router = useRouter();

  // if user logs out then they are sent to the start page
  useEffect(() => {
    if (user) {
    } else {
      router.push("/");
    }
  }, [user]);

  // gets the users order history
  useEffect(() => {
    const db = getDatabase();
    const userData = ref(db, "users/" + user?.uid);
    onValue(userData, (snapshot) => {
      if (snapshot.val()) {
        // converts the objects into an array to map and display
        const myData: Order[] = Object.keys(snapshot.val()).map((key: any) => {
          return snapshot.val()[key];
        });
        setData(myData);
      }
    });
  }, []);

  return (
    <Layout>
      <main className="flex flex-col min-h-full h-fit px-40 py-6 max-xl:p-6 gap-8">
        <div className="text-2xl font-semibold">Order History</div>
        <div className="flex flex-col flex-wrap max-sm:flex-row gap-1">
          <div className="flex flex-row max-sm:flex-col text-xl max-sm:text-lg font-semibold p-1">
            <div className="flex items-center justify-center max-sm:justify-start basis-1/5">
              ID
            </div>
            <div className="flex items-center justify-center max-sm:justify-start basis-1/5">
              DATE
            </div>
            <div className="flex items-center justify-center max-sm:justify-start basis-1/5">
              TOTAL
            </div>
            <div className="flex items-center justify-center max-sm:justify-start basis-1/5">
              PAID
            </div>
            <div className="flex items-center justify-center max-sm:justify-start basis-1/5">
              DELIVERED
            </div>
          </div>
          {data?.map((order: Order) => {
            return (
              <div
                className="flex flex-row max-sm:flex-col text-center bg-gray-200 p-1"
                key={`${order.id}`}
              >
                <div className="flex items-center justify-center basis-1/5">
                  {order.id}
                </div>
                <div className="flex items-center justify-center basis-1/5">
                  {order.date}
                </div>
                <div className="flex items-center justify-center basis-1/5">
                  {order.total}&euro;
                </div>
                <div className="flex items-center justify-center basis-1/5">
                  not paid
                </div>
                <div className="flex items-center justify-center basis-1/5">
                  not delivered
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </Layout>
  );
};

export default UserProfile;
