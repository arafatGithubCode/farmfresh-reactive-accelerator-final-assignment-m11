import { TOrderStatus } from "@/types";

export const getStatusLabel = (status: TOrderStatus) => {
  switch (status) {
    case "DELIVERED":
      return "Delivered";
    case "CANCELED":
      return "Canceled";
    default:
      return "Pending";
  }
};
