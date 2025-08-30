"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({ link, label }: { link: string; label: string }) => {
  const pathname = usePathname();

  return (
    <Link
      href={link}
      className={`text-gray-700 dark:text-gray-300 ${
        pathname === link && "text-primary-600 dark:text-primary-600"
      } hover:text-primary-600 dark:hover:text-primary-600 transition`}
    >
      {label}
    </Link>
  );
};

export default NavItem;
