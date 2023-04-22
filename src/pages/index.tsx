import Banner from "@/components/Banner";
import BestSellers from "@/components/BestSeller";
import CategoriesHeader from "@/components/CategoriesHeader";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <main className="h-auto w-full">
        <CategoriesHeader />
        <BestSellers />
        <Banner />
      </main>
    </Layout>
  );
}
