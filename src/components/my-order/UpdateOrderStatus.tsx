"use client";

import { doUpdateOrderStatus } from "@/actions/product";
import { showToast } from "@/providers/ToastProvider";
import { TOrderStatus } from "@/types";
import { catchErr } from "@/utils/catchErr";
import { getForwardOrderStatus } from "@/utils/getForwardOrderStatus";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../ui/Button";

type Props = {
  orderId: string;
  currentStatus: TOrderStatus;
  role: "Customer" | "Farmer";
};

const UpdateOrderStatus = ({ orderId, currentStatus, role }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await doUpdateOrderStatus(orderId, currentStatus, role);
      console.log(response, "res");
      if (!response.success) {
        showToast(response.message, "ERROR");
      } else {
        showToast(response.message, "SUCCESS");
        router.refresh();
      }
    } catch (error) {
      console.log(error, "status-client-err");
      const errMsg = catchErr(error);
      showToast(errMsg.error, "ERROR");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {role === "Customer" && currentStatus === "PLACED" && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex flex-wrap gap-3">
            <Button
              label="Cancel Order"
              loading={loading}
              hasSpinner={true}
              icon={<FaTimes className="mr-2" />}
              loadingText="Canceling..."
              variant="danger"
              fullWidth={false}
            />
          </div>
        )}
        {role === "Customer" && currentStatus === "CANCELED" && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex flex-wrap gap-3">
            <Button
              label="Place this order again"
              loading={loading}
              hasSpinner={true}
              variant="warning"
              fullWidth={false}
            />
          </div>
        )}
        {role === "Farmer" &&
          currentStatus !== "DELIVERED" &&
          currentStatus !== "CANCELED" && (
            <Button
              label={getForwardOrderStatus(currentStatus)!}
              loading={loading}
              hasSpinner={true}
              loadingText="Status Updating..."
              fullWidth={false}
            />
          )}
      </form>
    </>
  );
};

export default UpdateOrderStatus;
