import { TOrderStatus } from "@/types";

export const getForwardOrderStatus = (currentStatus: TOrderStatus) => {
  switch (currentStatus) {
    case "PLACED":
      return "Accept the order";
    case "CONFIRMED":
      return "Shipped the order";
    case "SHIPPED":
      return "Delivered the order";
    default:
      break;
  }
};
