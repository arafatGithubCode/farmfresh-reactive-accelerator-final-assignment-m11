"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

const allowedPath = ["/add-product", "/manage-products", "/my-orders"];

const BreadCrumb = () => {
  const pathname = usePathname();
  if (!allowedPath.includes(pathname)) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          {pathname === "/add-product" && (
            <>
              <li className="flex items-center">
                <Link href="/" className="text-gray-500 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <FaChevronRight className="text-gray-400 text-xs" />
              <Link
                href="/manage-products"
                className="text-gray-500 hover:text-primary-600"
              >
                Manage Products
              </Link>
              <FaChevronRight className="text-gray-400 text-xs" />
              <Link
                href="/add-product"
                className="dark:text-white text-gray-900"
              >
                Add Product
              </Link>
            </>
          )}
          {pathname === "/manage-products" && (
            <>
              <li className="flex items-center">
                <Link href="/" className="text-gray-500 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <FaChevronRight className="text-gray-400 text-xs" />
              <Link
                href="/manage-products"
                className="dark:text-white text-gray-900"
              >
                Manage Products
              </Link>
            </>
          )}
          {pathname === "/my-orders" && (
            <>
              <li className="flex items-center">
                <Link href="/" className="text-gray-500 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <FaChevronRight className="text-gray-400 text-xs" />
              <Link href="/my-orders" className="dark:text-white text-gray-900">
                My Orders
              </Link>
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
