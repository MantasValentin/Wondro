import React from "react";
import img1 from "../../assets/header/home-img-1.jpg";
import img2 from "../../assets/header/home-img-2.jpg";
import img3 from "../../assets/header/home-img-3.jpg";
import img4 from "../../assets/header/home-img-4.jpg";
import Image from "next/image";
import Link from "next/link";

const CategoriesHeader = () => {
  return (
    <section className="w-full px-12 py-4 max-xl:p-4 select-none">
      <ul className="flex flex-wrap">
        <li className="basis-1/4 max-xl:basis-1/2 max-sm:basis-full flex-grow p-2 h-96">
          <Link href="categories/skincare" className="relative">
            <Image
              src={img2.src}
              alt="Skin Care"
              width={img2.width}
              height={img2.height}
              className="w-full h-full object-cover transition hover:cursor-pointer"
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-20 transition duration-300 hover:bg-opacity-10" />
          </Link>
          <p className="relative w-fit bottom-12 left-6 text-white text-4xl font-semibold">
            Skin Care
          </p>
        </li>
        <li className="basis-1/4 max-xl:basis-1/2 max-sm:basis-full flex-grow p-2 h-96">
          <Link href="categories/lamps" className="relative">
            <Image
              src={img1.src}
              alt="Lamps"
              width={img1.width}
              height={img1.height}
              className="w-full h-full object-cover transition duration-300 hover:shadow-sm hover:opacity-70 hover:cursor-pointer"
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-20 transition duration-300 hover:bg-opacity-10" />
          </Link>
          <p className="relative w-fit bottom-12 left-6 text-white text-4xl font-semibold">
            Lamps
          </p>
        </li>
        <li className="basis-1/4 max-xl:basis-1/2 max-sm:basis-full flex-grow p-2 h-96">
          <Link href="categories/furniture" className="relative">
            <Image
              src={img3.src}
              alt="Furniture"
              width={img3.width}
              height={img3.height}
              className="w-full h-full object-cover transition duration-300 hover:shadow-sm hover:opacity-70 hover:cursor-pointer"
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-20 transition duration-300 hover:bg-opacity-10" />
          </Link>
          <p className="relative w-fit bottom-12 left-6 text-white text-4xl font-semibold">
            Furniture
          </p>
        </li>
        <li className="basis-1/4 max-xl:basis-1/2 max-sm:basis-full flex-grow p-2 h-96">
          <Link href="categories/chairs" className="relative">
            <Image
              src={img4.src}
              alt="Chairs"
              width={img4.width}
              height={img4.height}
              className="w-full h-full object-cover transition duration-300 hover:shadow-sm hover:opacity-70 hover:cursor-pointer"
            />
            <div className="absolute top-0 w-full h-full bg-black bg-opacity-20 transition duration-300 hover:bg-opacity-10" />
          </Link>
          <p className="relative w-fit bottom-12 left-6 text-white text-4xl font-semibold">
            Chairs
          </p>
        </li>
      </ul>
    </section>
  );
};

export default CategoriesHeader;
