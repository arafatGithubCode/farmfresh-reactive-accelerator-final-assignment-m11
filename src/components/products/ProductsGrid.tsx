"use client";

import { useState } from "react";
import { FaTh } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import Pagination from "../common/Pagination";
import ProductCard from "../common/ProductCard";

const ProductsGrid = () => {
  const [viewType, setViewType] = useState<"GRID" | "LIST">("GRID");
  return (
    <div className="lg:col-span-3">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Showing 1-12 of 48 products
        </p>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
            <option>Rating</option>
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
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <Pagination />
    </div>
  );
};

export default ProductsGrid;
