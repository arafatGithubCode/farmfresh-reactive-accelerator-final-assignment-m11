"use client";

import { doSignOut } from "@/actions/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const Dropdown = ({ image, name }: { image: string; name: string }) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        dropdownTriggerRef.current &&
        !dropdownTriggerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        ref={dropdownTriggerRef}
        onClick={() => setShowDropdown((prev) => !prev)}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
      >
        <Image
          src={
            image
              ? image
              : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
          }
          alt="User"
          className="w-8 h-8 rounded-full border border-primary-500"
          width={50}
          height={50}
        />
        <span className="hidden sm:block">{name}</span>
        <FaAngleDown />
      </button>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="bg-white dark:bg-gray-800 rounded-b py-2 min-w-40 absolute left-0 right-0 top-12 animate-fade-up shadow divide-x-2"
        >
          <div className="flex flex-col gap-2 items-start">
            <Link
              onClick={() => setShowDropdown(false)}
              href="/my-orders"
              className="pl-2 text-gray-600 hover:text-primary-600 duration-200 ease-linear dark:text-gray-300 dark:hover:text-primary-600 w-full"
            >
              Bookings List
            </Link>
            <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600" />
            <Link
              onClick={() => setShowDropdown(false)}
              href="/profile"
              className="pl-2 text-gray-600 hover:text-primary-600 duration-200 ease-linear dark:text-gray-300 dark:hover:text-primary-600 w-full"
            >
              Profile
            </Link>
            <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-600" />
            <button
              onClick={async () => {
                await doSignOut();
                setShowDropdown(false);
                await router.push("/");
                router.refresh();
              }}
              className="bg-transparent text-gray-600 hover:text-primary-600 w-full dark:text-gray-300 dark:hover:text-primary-600 text-start pl-2 duration-200 ease-linear"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
