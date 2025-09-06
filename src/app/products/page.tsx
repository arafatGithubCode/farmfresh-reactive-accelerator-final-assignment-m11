import CategoryFilter from "@/components/products/CategoryFilter";
import LocationFilter from "@/components/products/LocationFilter";
import OrganicFilter from "@/components/products/OrganicFilter";
import PriceFilter from "@/components/products/PriceFilter";
import ProductsGrid from "@/components/products/ProductsGrid";

const ProductsPage = () => {
  return (
    <>
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Fresh Products</h1>
          <p className="text-xl text-primary-100">
            Discover fresh, locally-sourced produce from our trusted farmers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Filters
              </h3>
              <CategoryFilter />
              <PriceFilter />
              <LocationFilter />
              <OrganicFilter />
            </div>
          </div>
          <ProductsGrid />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
