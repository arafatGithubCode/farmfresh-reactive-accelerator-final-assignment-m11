"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

const BreadCrumb = () => {
  const pathname = usePathname();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-primary-600"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <FaChevronRight className="text-gray-400 text-xs" />
          </li>
          <li>
            <Link
              href="/manage-products"
              className={`${
                pathname === "/manage-products"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-primary-600"
              }`}
            >
              Manage Products
            </Link>
          </li>
          <li>
            <FaChevronRight className="text-gray-400 text-xs" />
          </li>
          {pathname === "/add-product" && (
            <li
              className={`${
                pathname === "/add-product"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-primary-600"
              }`}
            >
              Add Product
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
