"use client";

import { doSignOut } from "@/actions/auth";
import { SessionUser } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const UserNestedNav = ({
  user,
  avatar,
  name,
}: {
  user: SessionUser;
  avatar?: string;
  name?: string;
}) => {
  const [showSubNav, setShowSubNav] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setShowSubNav((prev) => !prev)}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
      >
        <Image
          src={
            user.image ||
            avatar ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          }
          alt="User"
          className="w-8 h-8 rounded-full"
          width={50}
          height={50}
        />
        <span className="hidden sm:block">{user.name || name}</span>
        <FaAngleDown />
      </button>
      {showSubNav && (
        <div className="bg-gray-100 dark:bg-gray-900 rounded py-2 absolute left-0 right-0 top-12 animate-fadeUp shadow divide-x-2">
          <button
            onClick={async () => {
              await doSignOut();
            }}
            className="bg-transparent text-gray-700 w-full dark:text-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default UserNestedNav;
