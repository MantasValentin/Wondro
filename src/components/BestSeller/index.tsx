import Image from "next/image";
import Link from "next/link";
import React from "react";
import { items } from "../../utils/data";

const BestSellers = () => {
  return (
    <section className="flex flex-col w-full py-8 gap-y-8">
      <div className="flex justify-center w-4/5 max-lg:w-full bg-gray-900 border-0 border-solid rounded-tr-full max-lg:rounded-none p-2">
        <h2 className="text-white text-2xl font-semibold">Best Sellers</h2>
      </div>
      <div className="w-full px-36 max-lg:px-6">
        <ul className="flex flex-wrap gap-4">
          {items.slice(0, 12).map((e) => {
            return (
              <li className="flex flex-auto basis-1/5 max-md:basis-1/4 max-sm:basis-1/3" key={e.id}>
                <Link
                  href={`categories/product/${e.id}`}
                  className="flex flex-auto items-center justify-center flex-col border-2 border-black border-opacity-30 transition duration-300 hover:border-opacity-70"
                >
                  <Image
                    src={e.img.src}
                    alt={e.description}
                    width={e.img.width}
                    height={e.img.height}
                    className="flex flex-auto"
                  />
                  <div className="flex justify-center text-lg text-center max-lg:text-base max-lg:font-semibold">
                    {e.description}
                  </div>
                  <div className="flex flex-1 justify-center items-end text-lg max-lg:text-base max-lg:font-semibold">
                    {e.price}&euro;
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BestSellers;
