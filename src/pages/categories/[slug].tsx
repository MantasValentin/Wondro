import { useRouter } from "next/router";
import { items } from "../../utils/data";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { category: "All", id: 1 },
  { category: "Lamps", id: 2 },
  { category: "Skincare", id: 3 },
  { category: "Furniture", id: 4 },
  { category: "Chairs", id: 5 },
];

const Category = () => {
  const { query } = useRouter();
  const { slug } = query;
  const category = String(slug);
  if (slug === "all") {
    var products = items;
  } else {
    var products = items.filter((x) => x.category === slug);
  }

  return (
    <Layout>
      <main className="h-auto min-h-full w-full">
        <section className="flex flex-col w-full py-8 gap-y-8">
          <div className="flex items-center justify-center text-2xl font-bold">
            {category.toUpperCase()}
          </div>
          <div className="">
            <ul className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((e) => {
                return (
                  <li className="" key={e.id}>
                    <Link
                      href={`/categories/${e.category.toLowerCase()}`}
                      className="text-xl px-2 py-[1px] max-w-[18rem] max-lg:max-w-[12rem] border-2 border-black border-opacity-30 transition duration-300 hover:border-opacity-70"
                    >
                      {e.category}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full px-4">
            <ul className="flex flex-wrap items-center justify-center gap-4">
              {products.map((e) => {
                return (
                  <li className="" key={e.id}>
                    <Link
                      href={`/categories/product/${e.id}`}
                      className="flex flex-col max-w-[18rem] max-lg:max-w-[12rem] border-2 border-black border-opacity-30 transition duration-300 hover:border-opacity-70"
                    >
                      <Image
                        src={e.img.src}
                        alt={e.description}
                        width={e.img.width}
                        height={e.img.height}
                        className="flex justify-center items-center"
                      />
                      <div className="flex justify-center text-xl text-center max-lg:text-base max-lg:font-semibold">
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
      </main>
    </Layout>
  );
};

export default Category;
