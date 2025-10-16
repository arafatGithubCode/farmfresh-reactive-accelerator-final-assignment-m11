"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Props = {
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  limit: number;
};

const Pagination = ({ pagination }: { pagination: Props }) => {
  const { totalPages, currentPage } = pagination;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const handlePageClick = (page: number) => {
    if (page) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex justify-center mt-12">
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center -space-x-px text-gray-600 dark:text-gray-300">
          <li>
            <a
              href="#"
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <FaChevronLeft />
            </a>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => handlePageClick(index + 1)}
                className={`px-3 py-2 leading-tight text-white ${
                  index + 1 === currentPage
                    ? "bg-primary-600 border-primary-600 hover:bg-primary-700"
                    : "dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-800 bg-gray-400 border-gray-300 hover:bg-gray-500"
                } border`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <a
              href="#"
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <FaChevronRight />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
