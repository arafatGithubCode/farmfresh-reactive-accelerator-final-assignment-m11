import { getProducts } from "@/queries/product";
import {
  FaAppleAlt,
  FaCarrot,
  FaCheese,
  FaLeaf,
  FaSeedling,
} from "react-icons/fa";
import { FaJar } from "react-icons/fa6";
import CategoryBox from "../ui/CategoryBox";

const Categories = async () => {
  const { products } = await getProducts({});
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover fresh, locally-sourced produce across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {
            <CategoryBox
              label="Vegetables"
              icon={
                <FaCarrot className="text-3xl text-green-600 dark:text-green-400 mb-3" />
              }
              products={products}
            />
          }
          {
            <CategoryBox
              label="Fruits"
              icon={
                <FaAppleAlt className="text-3xl text-red-600 dark:text-red-400 mb-3" />
              }
              products={products}
            />
          }
          {
            <CategoryBox
              label="Grains"
              icon={
                <FaSeedling className="text-3xl text-yellow-600 dark:text-yellow-400 mb-3" />
              }
              products={products}
            />
          }
          {
            <CategoryBox
              label="Dairy"
              icon={
                <FaCheese className="text-3xl text-blue-600 dark:text-blue-400 mb-3" />
              }
              products={products}
            />
          }
          {
            <CategoryBox
              label="Honey"
              icon={
                <FaJar className="text-3xl text-purple-600 dark:text-purple-400 mb-3" />
              }
              products={products}
            />
          }
          {
            <CategoryBox
              label="Herbs"
              icon={
                <FaLeaf className="text-3xl text-orange-600 dark:text-orange-400 mb-3" />
              }
              products={products}
            />
          }
        </div>
      </div>
    </section>
  );
};

export default Categories;
