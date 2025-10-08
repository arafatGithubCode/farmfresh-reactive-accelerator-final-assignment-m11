import { getOrderStatus } from "@/utils/getOrderStatus";
import { Fragment } from "react";
import { FaCheckCircle } from "react-icons/fa";

const orderStatus = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];

const OrderStatus = ({
  status,
}: {
  status: "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELED";
}) => {
  return (
    <div className="flex items-center space-x-4 text-sm">
      {orderStatus.map((item, index) => (
        <Fragment key={item}>
          <div
            className={`flex items-center ${
              status === item
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <FaCheckCircle className="mr-1" />
            <span>{getOrderStatus(item)}</span>
          </div>
          {index < 3 && (
            <div
              className={`w-8 h-0.5 ${
                status === item ? "bg-yellow-500" : "bg-gray-500"
              }`}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default OrderStatus;
