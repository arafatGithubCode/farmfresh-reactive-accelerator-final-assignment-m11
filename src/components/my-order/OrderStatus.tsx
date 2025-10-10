import { TOrderStatus } from "@/types";
import { getOrderStatus } from "@/utils/getOrderStatus";
import { Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";

const ORDER_STEPS: TOrderStatus[] = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
];

const OrderStatus = ({ status }: { status: TOrderStatus }) => {
  const isDelivered = status === "DELIVERED";
  const currentStepIndex = ORDER_STEPS.indexOf(status);

  return (
    <div className="flex items-center gap-3 text-sm">
      {ORDER_STEPS.map((step, index) => {
        const isActive = index <= currentStepIndex;
        const isCurrent = index === currentStepIndex;

        const textColor = isDelivered
          ? "text-green-600 dark:text-green-400"
          : isCurrent
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-gray-600 dark:text-gray-400";

        const lineColor = isDelivered
          ? "bg-primary-500"
          : isActive
          ? "bg-yellow-500"
          : "bg-gray-500";

        return (
          <Fragment key={step}>
            <div className={`flex items-center ${textColor}`}>
              <FaCheckCircle className="mr-1" />
              <span>{getOrderStatus(step)}</span>
            </div>
            {index < ORDER_STEPS.length - 1 && (
              <div className={`w-8 h-0.5 ${lineColor}`} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderStatus;
