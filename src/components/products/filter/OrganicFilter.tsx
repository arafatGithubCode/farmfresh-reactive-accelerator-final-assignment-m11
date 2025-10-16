"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const OrganicFilter = () => {
  const [query, setQuery] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    const organic = searchParams.get("organic");
    if (organic) {
      params.set("organic", organic);
    }
  }, []);

  useEffect(() => {
    if (query) {
      params.set("organic", String(query));
    } else {
      params.delete("organic");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [query]);

  return (
    <div className="mb-6">
      <label className="flex items-center">
        <input
          type="checkbox"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.checked)
          }
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          Organic Only
        </span>
      </label>
    </div>
  );
};

export default OrganicFilter;
