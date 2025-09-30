"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa6";

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">{children}</ol>
    </nav>
  </div>
);

const Item = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} className="text-gray-500 hover:text-primary-600">
    {children}
  </Link>
);

const Current = ({ children }: { children: ReactNode }) => (
  <span className="dark:text-white text-gray-900">{children}</span>
);

const Separator = () => <FaChevronRight className="text-gray-400 text-xs" />;

const BreadCrumb = ({
  productName,
  productId,
}: {
  productName?: string;
  productId?: string;
}) => {
  const pathname = usePathname();

  // case 1: Add Product
  if (pathname === "/add-product") {
    return (
      <Wrapper>
        <Item href="/">Home</Item>
        <Separator />
        <Item href="/manage-products">Manage Products</Item>
        <Separator />
        <Current>Add Product</Current>
      </Wrapper>
    );
  }

  // case 2: Manage Products
  if (pathname === "/manage-products") {
    return (
      <Wrapper>
        <Item href="/">Home</Item>
        <Separator />
        <Current>Manage Product</Current>
      </Wrapper>
    );
  }

  // case 3: My Orders
  if (pathname === "/my-orders") {
    return (
      <Wrapper>
        <Item href="/">Home</Item>
        <Separator />
        <Current>My Orders</Current>
      </Wrapper>
    );
  }

  // case 4: Product Details page (Dynamic route)
  if (pathname.startsWith("/products/") && productName) {
    return (
      <Wrapper>
        <Item href="/">Home</Item>
        <Separator />
        <Item href="/products">Products</Item>
        <Separator />
        <Current>{productName}</Current>
      </Wrapper>
    );
  }

  // case 5: Payment Process
  if (pathname.startsWith("/payment-process/") && productId) {
    return (
      <Wrapper>
        <Item href="/">Home</Item>
        <Separator />
        <Item href={`/products/${productId}`}>Product Details</Item>
        <Separator />
        <Current>Payment</Current>
      </Wrapper>
    );
  }

  // case 6: Edit Products
  if (pathname.startsWith("/products/edit/")) {
    return (
      <Wrapper>
        <Item href="/">Home</Item>
        <Separator />
        <Item href="/manage-products">Manage Product</Item>
        <Current>Edit Product</Current>
      </Wrapper>
    );
  }

  return null;
};

export default BreadCrumb;
