import { IProductFrontend } from "@/types";

export const useBalance = (
  selectedItems: {
    product: IProductFrontend;
    quantity: number;
    id?: string;
  }[]
) => {
  const subtotal = selectedItems?.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0
  );

  const totalDiscountAmount = selectedItems?.reduce((acc, cur) => {
    const discount =
      ((cur.product.discountRate ?? 0) / 100) *
      (cur.product.price * cur.quantity);
    return acc + discount;
  }, 0);

  const serviceFee = selectedItems[0]?.product.serviceFee ?? 0;

  const baseDeliveryFee = selectedItems[0]?.product.baseDeliveryFee ?? 0;

  const totalPerUnitDeliveryFee = selectedItems?.reduce((acc, cur) => {
    const perUnitDeliveryFee =
      cur.quantity > 1
        ? (cur.quantity - 1) * cur.product.perUnitDeliveryFee
        : 0;

    return acc + perUnitDeliveryFee;
  }, 0);

  const totalDeliveryFee = baseDeliveryFee + totalPerUnitDeliveryFee;

  const total = subtotal + serviceFee + totalDeliveryFee - totalDiscountAmount;

  return {
    subtotal,
    totalDiscountAmount,
    serviceFee,
    totalDeliveryFee,
    total,
  };
};
