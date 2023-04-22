import Image from "next/image";
import Link from "next/link";
import React from "react";
import banner1 from "../../assets/banners/banner1.jpg";

const Banner = () => {
  return (
    <section className="w-full pl-[20%] max-xl:px-6 pb-8">
      <div className="flex flex-row max-md:flex-col  w-full bg-gray-900 p-4 max-md:p-0 rounded-l-xl max-xl:rounded-none">
        <div className="relative max-md:hidden">
          <Image
            src={banner1.src}
            alt="furniture"
            width={banner1.width}
            height={banner1.height}
            className="w-full h-full object-cover"
          ></Image>
        </div>
        <div className="flex flex-col m-4 items-center justify-center text-white text-center">
          <span className="text-3xl max-md:text-2xl max-xs:text-lg mb-2">Creative harmonious living</span>
          <span className="text-xl max-md:text-lg max-xs:text-base mb-2 px-32 max-lg:px-10 max-md:px-0">
            Wondro Products are all made to standard sizes so that you can mix
            and match them freely.
          </span>
          <Link
            href={"/categories/all"}
            className="flex w-fit py-1 px-2 bg-gray-700 text-white text-lg font-semibold border-2 border-gray-900 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
