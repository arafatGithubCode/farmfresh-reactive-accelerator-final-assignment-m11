"use client";

// import { doAddingCart } from "@/actions/product";
import { useCatchErr } from "@/hooks/useCatchErr";
import { showToast } from "@/providers/ToastProvider";
import { IProductFrontend } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";

// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import {
  FaEye,
  FaMinus,
  FaPlus,
  FaRegHeart,
  FaStar,
  FaTrash,
} from "react-icons/fa6";
import ProductImageCarousel from "../ui/ProductImageCarousel";

interface CartItem {
  product: IProductFrontend;
  quantity: number;
}

const ProductCard = ({
  isManageListingPage = false,
  product,
}: {
  isManageListingPage?: boolean;
  product: IProductFrontend;
}) => {
  const { data: session } = useSession();
  const customerId = session?.user?.id;

  const [loading, setLoading] = useState<boolean>(false);
  const { err, catchErr, setErr } = useCatchErr();
  //   const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const isInCart = cartItems?.some((item) => item?.product?.id === product.id);
  const cartItem = cartItems?.find((item) => item?.product?.id === product.id);

  const updateCart = async (action: "ADD" | "INCREMENT" | "DECREMENT") => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerId, productId: product.id, action }),
        }
      );

      if (!response.ok) {
        // router.push("/login");
        setErr("Failed to update cart!");
      }
      const data = await response.json();

      // update cart state instantly
      setCartItems((prev) => {
        const exist = prev.find((item) => item.product.id === data?.productId);

        // if quantity 0 -> remove the product
        if (data?.quantity <= 0) {
          return prev.filter((item) => item.product.id !== data?.productId);
        }

        // update quantity if exist
        if (exist) {
          return prev.map((item) =>
            item.product.id === data?.productId
              ? { ...item, quantity: data?.quantity }
              : item
          );
        } else {
          // add new product
          return [...prev, { product, quantity: data?.quantity }];
        }
      });
      if (data?.actionType === "ADD") {
        showToast(`${product.name} has been added to cart.`, "SUCCESS");
      }
    } catch (error) {
      catchErr(error);
      showToast(err!, "ERROR");
      //   router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!customerId) return;

    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart?customerId=${customerId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart!");
        }
        const data = await response.json();
        setCartItems(data?.cart?.items);
      } catch (error) {
        catchErr(error);
      }
    };
    fetchCart();
  }, [customerId]);

  return (
    <form className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {product?.imagesUrl?.length > 0 && (
          <ProductImageCarousel images={product.imagesUrl} />
        )}
        <div className="absolute top-3 left-3">
          {product?.features?.length > 0 && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {product.features[0]}
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <button className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <FaRegHeart className="text-gray-600 dark:text-gray-400 text-xl" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {product?.name}
          </h3>
          <div className="flex items-center text-yellow-400">
            <FaStar className="text-sm" />
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              4.8
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          By {product?.farmer?.firstName}&apos;s Farm •{" "}
          {product?.farmer?.farmDistrict}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ৳{product?.price.toFixed(0)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              /{product?.unit}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Stock: {`${product?.stock.toFixed(0)}${product?.unit}`}
          </span>
        </div>
        {isManageListingPage ? (
          <div className="flex space-x-2">
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition text-sm">
              <FaEdit className="mr-1" />
              Edit
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
              <FaEye />
            </button>
            <button className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition">
              <FaTrash />
            </button>
          </div>
        ) : isInCart ? (
          <div className="bg-white rounded-lg border border-primary-500 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="font-semibold py-1 px-4 rounded-lg rounded-r-none border-r border-primary-500 text-black">
                {cartItem?.quantity ?? 1} {product.unit}
              </div>
              <div className="flex items-center justify-center gap-4 flex-grow">
                <button
                  disabled={loading}
                  type="button"
                  onClick={() => updateCart("INCREMENT")}
                  className="disabled:cursor-wait"
                >
                  <FaPlus className="text-xl text-black hover:text-primary-500 duration-200 cursor-pointer" />
                </button>
                <button
                  disabled={loading}
                  type="button"
                  onClick={() => updateCart("DECREMENT")}
                  className="disabled:cursor-wait"
                >
                  <FaMinus className="text-xl text-black hover:text-primary-500 duration-200 cursor-pointer" />
                </button>
              </div>
              <button
                type="button"
                className="text-black bg-red-50 py-1 px-2 rounded-lg rounded-l-none border-l border-primary-500"
              >
                Remove
              </button>
            </div>
            <Link
              className="bg-primary-500 px-4 py-1 text-white text-xl font-semibold text-center rounded-lg rounded-t-none"
              href="/cart"
            >
              Go to cart
            </Link>
          </div>
        ) : (
          <button
            disabled={loading}
            type="button"
            onClick={() => updateCart("ADD")}
            className="w-full text-white py-3 bg-primary-600 hover:bg-primary-700 hover:scale-105 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center disabled:cursor-wait"
          >
            {loading ? "Adding.." : "Add to cart"}
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductCard;
