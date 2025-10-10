"use client";

import { doDeletingProductImage } from "@/actions/product";
import { useCatchErr } from "@/hooks/useCatchErr";
import { showToast } from "@/providers/ToastProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import Button from "../ui/Button";
import CloseBtn from "../ui/CloseBtn";

const DeleteImage = ({
  deletedImage,
  onCancel,
  public_id,
  productId,
}: {
  deletedImage: string;
  onCancel: () => void;
  public_id: string;
  productId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { catchErr, err } = useCatchErr();

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await doDeletingProductImage(public_id, productId);
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
        showToast("Failed to delete this image", "ERROR");
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
      <p className="font-semibold">Are you sure to delete this image?</p>
      <Image
        src={deletedImage}
        alt="delete-image"
        width={200}
        height={200}
        placeholder="blur"
        blurDataURL={deletedImage}
        className="my-5"
      />
      <div className="w-full flex items-center justify-between">
        <CloseBtn level="No, Keep It" onClose={onCancel} />

        <Button
          label="Yes, delete it."
          loading={loading}
          hasSpinner={true}
          loadingText="Deleting..."
          variant="danger"
          fullWidth={false}
        />
      </div>
    </form>
  );
};

export default DeleteImage;
