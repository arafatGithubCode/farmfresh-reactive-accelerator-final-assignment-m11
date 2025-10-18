"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

const priceRanges = [
  { label: "Under ৳60", min: 0, max: 60 },
  { label: "৳60 - ৳200", min: 60, max: 200 },
  { label: "৳200 - ৳500", min: 200, max: 500 },
  { label: "Over ৳500", min: 500, max: Infinity },
  { label: "All Range", min: 0, max: Infinity },
];
const PriceFilter = () => {
  const [query, setQuery] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    range: { min: number; max: number }
  ) => {
    if (e.target.checked) {
      setQuery(`${range.min}-${range.max}`);
    }
  };

  const params = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    const priceRange = params.get("priceRange");
    if (priceRange) {
      const decodedPriceRange = decodeURI(priceRange);
      setQuery(decodedPriceRange);
    }
  }, [params]);

  useEffect(() => {
    if (query) {
      params.set("priceRange", query);
    } else {
      params.delete("priceRange");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [query, params, pathname, router]);

  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
        Price Range
      </h4>
      <div className="space-y-2">
        {priceRanges.map((range) => {
          const value = `${range.min}-${range.max}`;
          return (
            <label key={range.label} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={value}
                checked={query === value}
                onChange={(e) => handleChange(e, range)}
                className="border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                {range.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default PriceFilter;
