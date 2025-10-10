"use client";

import { doDeleteProduct } from "@/actions/product";
import { useCatchErr } from "@/hooks/useCatchErr";
import { showToast } from "@/providers/ToastProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import Button from "../ui/Button";

const DeleteProduct = ({
  productId,
  productName,
  productImage,
  onClose,
}: {
  productId: string;
  productName: string;
  productImage: { url: string; public_id: string; id?: string }[];
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { catchErr, err } = useCatchErr();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await doDeleteProduct(
        productId,
        productName,
        productImage
      );
      if (!response.success) {
        showToast(response.error, "ERROR");
      } else {
        showToast(response.message, "SUCCESS");

        router.refresh();
      }
    } catch (error) {
      catchErr(error);
      if (err) {
        showToast(err, "ERROR");
      } else {
        showToast("Failed to delete this product", "ERROR");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-2"
    >
      <PiWarningCircleFill className="text-xl text-orange-400 my-2" />
      <p className="font-semibold">Are you sure to delete this product?</p>
      <Image
        src={productImage[0].url}
        alt="delete-image"
        width={200}
        height={200}
        placeholder="blur"
        blurDataURL={productImage[0].url}
        className="my-5"
      />
      <p className="font-semibold mb-3 text-primary-500">{productName}</p>
      <div className="w-full flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-white py-3 bg-primary-600 hover:bg-primary-700 hover:scale-105 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center"
        >
          Close
        </button>
        <Button
          label="Yes, delete it."
          loading={loading}
          hasSpinner={true}
          loadingText="Deleting..."
          fullWidth={false}
        />
      </div>
    </form>
  );
};

export default DeleteProduct;
