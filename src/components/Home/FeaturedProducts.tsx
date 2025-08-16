import ProductCard from "../common/ProductCard";

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Fresh picks from our local farmers
            </p>
          </div>
          <a
            href="products.html"
            className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
          >
            View All <i className="fas fa-arrow-right ml-1"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard isManageListingPage={false} />
          <ProductCard isManageListingPage={false} />
          <ProductCard isManageListingPage={false} />
          <ProductCard isManageListingPage={false} />
          <ProductCard isManageListingPage={false} />
          <ProductCard isManageListingPage={false} />
          <ProductCard isManageListingPage={false} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
