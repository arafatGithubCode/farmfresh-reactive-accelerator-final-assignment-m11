export const getOrderStatus = (
  status: "PLACED" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | string
) => {
  switch (status) {
    case "PLACED":
      return "Order Placed";
    case "CONFIRMED":
      return "Confirmed";
    case "SHIPPED":
      return "Shipped";
    case "DELIVERED":
      return "Delivered";
    default:
      break;
  }
};
