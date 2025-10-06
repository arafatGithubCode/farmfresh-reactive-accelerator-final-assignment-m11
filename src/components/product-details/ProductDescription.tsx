"use client";

import { TBaseUser } from "@/types";
import Image from "next/image";
import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTractor,
} from "react-icons/fa";

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

      {tab.isFarmer && (
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Image
              src={farmer.image!}
              alt={farmer.firstName}
              className="w-20 h-20 rounded-full border-4 border-primary-500 object-cover"
              width={80}
              height={80}
            />
            <div>
              <h2 className="text-xl font-semibold">
                {farmer.firstName} {farmer.lastName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {farmer.role}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-primary-500" /> {farmer.email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary-500" /> {farmer.phone}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-500" /> {farmer.address}
            </p>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-lg font-semibold mb-1">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {farmer.bio}
            </p>
          </div>

          {/* Farm Info */}
          <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <FaTractor className="text-primary-500" /> Farm Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <p>
                <span className="font-semibold">Farm Name:</span>{" "}
                {farmer.farmName}
              </p>
              <p>
                <span className="font-semibold">Size:</span> {farmer.farmSize}{" "}
                {farmer.farmSizeUnit}
              </p>
              <p>
                <span className="font-semibold">Specialization:</span>{" "}
                {farmer.specialization}
              </p>
              <p>
                <span className="font-semibold">District:</span>{" "}
                {farmer.farmDistrict}
              </p>
              <p className="sm:col-span-2">
                <span className="font-semibold">Address:</span>{" "}
                {farmer.farmAddress}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
