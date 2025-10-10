"use client";

import { doUpdateOrderStatus } from "@/actions/product";
import { showToast } from "@/providers/ToastProvider";
import { TOrderStatus } from "@/types";
import { catchErr } from "@/utils/catchErr";
import { getForwardOrderStatus } from "@/utils/getForwardOrderStatus";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../ui/Button";
import Popup from "../ui/Popup";
import ConfirmedCancelOrder from "./ConfirmedCancelOrder";

interface UpdateOrderStatusProps {
  orderId: string;
  currentStatus: TOrderStatus;
  role: "Customer" | "Farmer";
}

const UpdateOrderStatus = ({
  orderId,
  currentStatus,
  role,
}: UpdateOrderStatusProps) => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const router = useRouter();

  // ===== Submit Handler =====
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await doUpdateOrderStatus(orderId, currentStatus, role);
      if (!response.success) {
        showToast(response.message, "ERROR");
      } else {
        showToast(response.message, "SUCCESS");
        router.refresh();
      }
    } catch (error) {
      const errMsg = catchErr(error);
      showToast(errMsg.error, "ERROR");
    } finally {
      setLoading(false);
    }
  };

  // ===== Render Button Based on Role and Status =====
  const renderButton = () => {
    // Customer: Cancel order
    if (role === "Customer" && currentStatus === "PLACED") {
      return (
        <Button
          type="button"
          label="Cancel Order"
          icon={<FaTimes className="mr-2" />}
          loading={loading}
          hasSpinner
          loadingText="Canceling..."
          variant="danger"
          fullWidth={false}
          onClick={() => setShowConfirm(true)}
        />
      );
    }

    // Customer: Re-place canceled order
    if (role === "Customer" && currentStatus === "CANCELED") {
      return (
        <Button
          type="button"
          onClick={handleSubmit}
          label="Place this order again"
          loading={loading}
          hasSpinner
          variant="warning"
          fullWidth={false}
        />
      );
    }

    // Farmer: Forward status (PLACED → CONFIRMED → SHIPPED → DELIVERED)
    if (
      role === "Farmer" &&
      !["DELIVERED", "CANCELED"].includes(currentStatus)
    ) {
      const nextLabel = getForwardOrderStatus(currentStatus);
      return (
        <Button
          type="button"
          onClick={handleSubmit}
          label={nextLabel ?? "Update Status"}
          loading={loading}
          hasSpinner
          loadingText="Updating..."
          fullWidth={false}
        />
      );
    }

    return null;
  };

  // ===== Render =====
  return (
    <div
      onSubmit={handleSubmit}
      className={`${
        currentStatus === "CANCELED" && role === "Customer"
          ? ""
          : "border-t border-gray-200 dark:border-gray-600"
      } pt-4 flex flex-wrap gap-3`}
    >
      {renderButton()}
      {showConfirm && (
        <Popup onClose={() => setShowConfirm(false)}>
          <ConfirmedCancelOrder
            loading={loading}
            message="Are you sure you want to cancel this order?"
            title="Cancel Order?"
            onConfirm={handleSubmit}
            onCancel={() => setShowConfirm(false)}
          />
        </Popup>
      )}
    </div>
  );
};

export default UpdateOrderStatus;
