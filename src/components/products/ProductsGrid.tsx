"use client";

import { IProductFrontend } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FaTh } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import ProductCardWrapper from "../common/ProductCardWrapper";

type Props = {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
};

const ProductsGrid = ({
  products,
  pagination,
}: {
  products: IProductFrontend[];
  pagination: Props;
}) => {
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");

  const [sort, setSort] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { totalPages, totalProducts, currentPage } = pagination;

  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const currentSort = searchParams.get("sort") || "";
    setSort(currentSort);
  }, [searchParams]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSort(newSort);

    if (newSort) {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {currentPage}-{totalPages} of {totalProducts} products
        </p>
        <div className="flex items-center space-x-4">
          <select
            value={sort}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="">Sort by: Featured</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="rating">Rating</option>
          </select>
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => setViewType("GRID")}
              className={`p-2 ${
                viewType === "GRID"
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              } rounded-l-lg`}
            >
              <FaTh />
            </button>
            <button
              onClick={() => setViewType("LIST")}
              className={`p-2 ${
                viewType === "LIST"
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              } rounded-r-lg`}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`grid ${
          viewType === "GRID"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1"
        } gap-6`}
      >
        <ProductCardWrapper products={products} viewType={viewType} />
      </div>
    </>
  );
};

export default ProductsGrid;
