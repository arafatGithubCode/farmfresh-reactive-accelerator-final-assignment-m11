"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const CategoryFilter = () => {
  const [query, setQuery] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      const filter = query.filter((q) => q !== name);
      setQuery(filter);
    }
  };

  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const category = params.get("category");

    if (category) {
      const decodedCategory = decodeURI(category);
      const decodedCategoryInQuery = decodedCategory.split("|");
      setQuery(decodedCategoryInQuery);
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      params.set("category", encodeURI(query.join("|")));
    } else {
      params.delete("category");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, query]);
  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
        Category
      </h4>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="vegetables"
            checked={query.includes("vegetables")}
            onChange={handleChange}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Vegetables (45)
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="fruits"
            checked={query.includes("fruits")}
            onChange={handleChange}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Fruits (32)
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="grains"
            checked={query.includes("grains")}
            onChange={handleChange}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Grains (18)
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="dairy"
            checked={query.includes("dairy")}
            onChange={handleChange}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Dairy (12)
          </span>
        </label>
      </div>
    </div>
  );
};

export default CategoryFilter;
