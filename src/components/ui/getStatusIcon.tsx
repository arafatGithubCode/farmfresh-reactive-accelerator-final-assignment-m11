import { TOrderStatus } from "@/types";
import { FaCheckCircle, FaRegClock, FaSadTear } from "react-icons/fa";

export const getStatusIcon = (status: TOrderStatus) => {
  switch (status) {
    case "DELIVERED":
      return <FaCheckCircle className="mr-1" />;
    case "CANCELED":
      return <FaSadTear className="mr-1" />;
    default:
      return <FaRegClock className="mr-1" />;
  }
};
