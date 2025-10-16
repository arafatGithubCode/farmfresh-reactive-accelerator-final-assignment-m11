"use client";

import { districts } from "@/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const LocationFilter = () => {
  const [location, setLocation] = useState("all-location");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentLocation = searchParams.get("location") || "";
    setLocation(currentLocation);
  }, [searchParams]);

  const params = new URLSearchParams(searchParams.toString());

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocation = e.target.value;
    setLocation(newLocation);

    if (newLocation) {
      params.set("location", newLocation);
    } else {
      params.delete("location");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
        Location
      </h4>
      <select
        value={location}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
      >
        <option value="">All Locations</option>
        {districts.map((district) => (
          <option value={district.toLowerCase()} key={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationFilter;
