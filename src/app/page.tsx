import Categories from "@/components/Home/Categories";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import WhyUs from "@/components/Home/WhyUs";
import { getProducts } from "@/queries/product";

const HomePage = async ({
  searchParams,
}: {
  searchParams: {
    term: string;
    category: string;
    priceRange: string;
    location: string;
    organic: string;
    sort: string;
  };
}) => {
  console.log(searchParams, "params");
  const { products } = await getProducts(searchParams);

  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts products={products} />
      <WhyUs />
    </>
  );
};

export default HomePage;
