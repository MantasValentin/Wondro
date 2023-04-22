import Layout from "@/components/Layout";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState, useEffect } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { StaticImageData } from "next/image";

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
  order: {
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
  }[];
}

const UserProfile: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState<Order[]>();
  const router = useRouter();

  useEffect(() => {
    if (user) {
    } else {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "users/" + user?.uid);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.val()) {
        const myData: Order[] = Object.keys(snapshot.val()).map((key: any) => {
          return snapshot.val()[key];
        });
        setData(myData);
        console.log(myData);
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
