"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchByTerm = ({ width }: { width?: string }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const doDebounceSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term) {
      params.set("term", term);
    } else {
      params.delete("term", term);
    }

    if (pathname === "/") {
      router.push(`/products?${params.toString()}`);
      return;
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleChange = (term: string) => {
    doDebounceSearch(term);
  };

  useEffect(() => {
    const term = searchParams.get("term");
    if (term) {
      setSearchTerm(term);
    }
  }, []);

  return (
    <div className="relative">
      <input
        type="text"
        defaultValue={searchTerm}
        placeholder="Search products..."
        onChange={(e) => {
          handleChange(e.target.value.trim().replace(/\s+/g, " "));
        }}
        className={`${
          width ? width : "w-64"
        } pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white`}
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  );
};

export default SearchByTerm;
