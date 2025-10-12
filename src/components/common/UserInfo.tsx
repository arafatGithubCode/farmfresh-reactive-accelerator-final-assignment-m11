"use client";

import { TBaseUser } from "@/types";
import Image from "next/image";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTractor,
} from "react-icons/fa";

const UserInfo = ({ user }: { user: TBaseUser }) => (
  <div className="space-y-4">
    {/* Header */}
    <div className="flex items-center gap-4">
      <Image
        src={user.image!}
        alt={user.firstName ?? "avatar"}
        className="w-20 h-20 rounded-full border-4 border-primary-500 object-cover"
        width={80}
        height={80}
      />
      <div>
        <h2 className="text-xl font-semibold">
          {user.firstName ?? user.name} {user.lastName ?? ""}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user.role ?? "Customer"}
        </p>
      </div>
    </div>

    {/* Contact Info */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      <p className="flex items-center gap-2">
        <FaEnvelope className="text-primary-500" /> {user.email}
      </p>
      <p className="flex items-center gap-2">
        <FaPhoneAlt className="text-primary-500" /> {user.phone}
      </p>
      <p className="flex items-center gap-2">
        <FaMapMarkerAlt className="text-primary-500" /> {user.address}
      </p>
    </div>

    {/* Bio */}
    <div>
      <h3 className="text-lg font-semibold mb-1">About</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{user.bio}</p>
    </div>

    {/* Farm Info */}
    {user.role === "Farmer" && (
      <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FaTractor className="text-primary-500" /> Farm Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <p>
            <span className="font-semibold">Farm Name:</span> {user.farmName}
          </p>
          <p>
            <span className="font-semibold">Size:</span> {user.farmSize}{" "}
            {user.farmSizeUnit}
          </p>
          <p>
            <span className="font-semibold">Specialization:</span>{" "}
            {user.specialization}
          </p>
          <p>
            <span className="font-semibold">District:</span> {user.farmDistrict}
          </p>
          <p className="sm:col-span-2">
            <span className="font-semibold">Address:</span> {user.farmAddress}
          </p>
        </div>
      </div>
    )}
  </div>
);

export default UserInfo;
