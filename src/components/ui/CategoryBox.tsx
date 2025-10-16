"use client";

import { IProductFrontend } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

const CategoryBox = ({
  label,
  icon,
  products,
}: {
  label: string;
  icon: ReactNode;
  products: IProductFrontend[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

  let styles = "";

  const handleClick = () => {
    if (pathname === "/") {
      router.push(`/products?category=${label.toLowerCase()}`);
    }
  };

  const numOfCategory = products.filter(
    (product) => product.category.toLowerCase() === label.toLowerCase()
  ).length;

  const getStyle = (category: string) => {
    switch (category) {
      case "vegetables":
        styles =
          "bg-green-100 dark:bg-green-900 group-hover:bg-green-200 dark:group-hover:bg-green-800";
        break;
      case "fruits":
        styles =
          "bg-red-100 dark:bg-red-900 group-hover:bg-red-200 dark:group-hover:bg-red-800";
        break;
      case "grains":
        styles =
          "bg-yellow-100 dark:bg-yellow-900 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800";
        break;
      case "dairy":
        styles =
          "bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800";
        break;
      case "honey":
        styles =
          "bg-purple-100 dark:bg-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-800";
        break;
      case "herbs":
        styles =
          "bg-orange-100 dark:bg-orange-900 group-hover:bg-orange-200 dark:group-hover:bg-orange-800";
        break;
      default:
        styles = "";
    }
  };

  getStyle(label.toLowerCase());

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div
        className={`${styles} rounded-2xl p-6 text-center transition flex flex-col items-center justify-center gap-2`}
      >
        {icon}
        <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
        {numOfCategory > 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {numOfCategory} item{numOfCategory > 1 ? "s" : ""}
          </p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">0 item</p>
        )}
      </div>
    </div>
  );
};

export default CategoryBox;
