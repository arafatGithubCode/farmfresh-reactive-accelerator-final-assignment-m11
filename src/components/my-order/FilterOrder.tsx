"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

const FilterOrder = () => {
  const [query, setQuery] = useState<string>("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);

  useEffect(() => {
    const orderStatus = params.get("orderStatus");
    if (orderStatus) {
      params.set("orderStatus", "orderStatus");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [params, pathname, router]);

  useEffect(() => {
    if (query) {
      params.set("orderStatus", query);
    } else {
      params.delete("orderStatus");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [query, pathname, params, router]);

  return (
    <div className="mt-4 sm:mt-0">
      <select
        value={query}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setQuery(e.target.value)
        }
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      >
        <option value="">All Orders</option>
        <option value="PLACED">Pending</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="DELIVERED">Delivered</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
    </div>
  );
};

export default FilterOrder;
