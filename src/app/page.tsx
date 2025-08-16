import Categories from "@/components/Home/Categories";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Hero from "@/components/Home/Hero";
import WhyUs from "@/components/Home/WhyUs";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyUs />
    </>
  );
};

export default HomePage;
