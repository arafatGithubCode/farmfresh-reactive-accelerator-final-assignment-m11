import Pagination from "@/components/common/Pagination";
import CategoryFilter from "@/components/products/filter/CategoryFilter";
import LocationFilter from "@/components/products/filter/LocationFilter";
import OrganicFilter from "@/components/products/filter/OrganicFilter";
import PriceFilter from "@/components/products/filter/PriceFilter";
import SearchByTerm from "@/components/products/filter/SearchByTerm";
import ProductsGrid from "@/components/products/ProductsGrid";
import { getProducts, getProductsByFarmerId } from "@/queries/product";
import { getFarmerById } from "@/queries/user";
import { IProductFrontend } from "@/types";
import Image from "next/image";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    term: string;
    category: string;
    priceRange: string;
    location: string;
    organic: string;
    sort: string;
    farmerId: string;
  };
}) => {
  const farmer = searchParams.farmerId
    ? await getFarmerById(searchParams.farmerId)
    : null;

  let allProducts: IProductFrontend[] = [];
  let allProductsOfSingleFarmer: IProductFrontend[] = [];
  let paginationInfo = null;

  if (searchParams.farmerId) {
    const { products, pagination } = await getProductsByFarmerId(
      searchParams,
      searchParams.farmerId
    );
    allProductsOfSingleFarmer = products;
    paginationInfo = pagination;
  } else {
    const { products, pagination } = await getProducts(searchParams);
    allProducts = products;
    paginationInfo = pagination;
  }

  return (
    <>
      {farmer ? (
        <div className="bg-primary-600 text-white py-12 ">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Fresh Products listed by
              </h1>
              <p>
                {" "}
                <strong>Farmer:</strong>{" "}
                {`${farmer.firstName} ${farmer.lastName}`}
              </p>
            </div>
            <div className="w-40 h-40 rounded-full relative">
              <Image
                src={farmer.image!}
                alt={farmer.firstName}
                fill={true}
                className="rounded-full border-2 border-white"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-primary-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Fresh Products</h1>
            <p className="text-xl text-primary-100">
              Discover fresh, locally-sourced produce from our trusted farmers
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Filters
              </h3>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Search Term
                </h4>
                <SearchByTerm width="w-52" />
              </div>
              <CategoryFilter />
              <PriceFilter />
              <LocationFilter />
              <OrganicFilter />
            </div>
          </div>
          <div className="lg:col-span-3">
            {allProductsOfSingleFarmer.length > 0 && (
              <ProductsGrid
                products={allProductsOfSingleFarmer}
                pagination={paginationInfo}
              />
            )}
            {allProducts.length > 0 && (
              <ProductsGrid
                products={allProducts}
                pagination={paginationInfo}
              />
            )}

            <Pagination pagination={paginationInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
