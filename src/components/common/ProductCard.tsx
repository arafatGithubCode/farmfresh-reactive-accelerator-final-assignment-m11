import { IProductModel } from "@/types";
import { FaEdit } from "react-icons/fa";
import { FaEye, FaRegHeart, FaStar, FaTrash } from "react-icons/fa6";
import ProductImageCarousel from "../ui/ProductImageCarousel";

const ProductCard = ({
  isManageListingPage = false,
  product,
}: {
  isManageListingPage?: boolean;
  product: IProductModel;
}) => {
  console.log(product);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {product?.imagesUrl?.length > 0 && (
          <ProductImageCarousel images={product.imagesUrl} />
        )}
        <div className="absolute top-3 left-3">
          {product?.features?.length > 0 && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {product.features[0]}
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <button className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <FaRegHeart className="text-gray-600 dark:text-gray-400 text-xl" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {product?.name}
          </h3>
          <div className="flex items-center text-yellow-400">
            <FaStar className="text-sm" />
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              4.8
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          By {product?.farmerName?.split(" ")[0]}&apos;s Farm •{" "}
          {product?.district}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ৳{product?.price.toFixed(0)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              /{product?.unit}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Stock: {`${product?.stock.toFixed(0)}${product?.unit}`}
          </span>
        </div>
        {isManageListingPage ? (
          <div className="flex space-x-2">
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition text-sm">
              <FaEdit className="mr-1" />
              Edit
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
              <FaEye />
            </button>
            <button className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition">
              <FaTrash />
            </button>
          </div>
        ) : (
          <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
