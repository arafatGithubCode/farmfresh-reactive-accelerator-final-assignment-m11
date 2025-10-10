"use client";

import { TBaseUser } from "@/types";
import { useState } from "react";
import UserInfo from "../common/UserInfo";

const ProductDescription = ({
  description,
  farmer,
}: {
  description: string;
  farmer: TBaseUser;
}) => {
  const [tab, setTab] = useState({
    isDescription: true,
    isReview: false,
    isFarmer: false,
  });

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() =>
              setTab((prev) => ({
                ...prev,
                isDescription: true,
                isFarmer: false,
                isReview: false,
              }))
            }
            className={`${
              tab.isDescription
                ? "border-b-2 border-primary-500 text-primary-600 dark:text-primary-400"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            } py-4 px-1 text-sm font-medium`}
          >
            Description
          </button>
          <button
            onClick={() =>
              setTab((prev) => ({
                ...prev,
                isReview: true,
                isDescription: false,
                isFarmer: false,
              }))
            }
            className={`${
              tab.isReview
                ? "border-b-2 border-primary-500 text-primary-600 dark:text-primary-400"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            } py-4 px-1 text-sm font-medium`}
          >
            Reviews (127)
          </button>
          <button
            onClick={() =>
              setTab((prev) => ({
                ...prev,
                isFarmer: true,
                isDescription: false,
                isReview: false,
              }))
            }
            className={`${
              tab.isFarmer
                ? "border-b-2 border-primary-500 text-primary-600 dark:text-primary-400"
                : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            } py-4 px-1 text-sm font-medium`}
          >
            Farmer Info
          </button>
        </nav>
      </div>

      {tab.isDescription && (
        <div className="py-8">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>About This Product</h3>
            <p>{description}</p>
          </div>
        </div>
      )}

      {tab.isReview && <h3>The number of reviews here</h3>}

      {tab.isFarmer && <UserInfo user={farmer} />}
    </div>
  );
};

export default ProductDescription;
