import { ICartItemFronted } from "@/types";

export const useDeliveryInfo = (items: ICartItemFronted[]) => {
  const sameDayDeliveryItems = items?.filter(
    (item) => item.product.deliveryMethod === "same_day_delivery"
  );
  const regularDeliveryItems = items?.filter(
    (item) => item.product.deliveryMethod === "regular_delivery"
  );

  const bookingDate = new Date();

  const sameDayDeliveryDate =
    sameDayDeliveryItems.length > 0 && new Date(bookingDate);
  if (typeof sameDayDeliveryDate === "object") {
    sameDayDeliveryDate.setDate(sameDayDeliveryDate.getDate() + 1);
  }

  const regularDeliveryDate =
    regularDeliveryItems?.length > 0 && new Date(bookingDate);
  if (typeof regularDeliveryDate === "object") {
    regularDeliveryDate.setDate(regularDeliveryDate.getDate() + 3);
  }

  return { bookingDate, sameDayDeliveryDate, regularDeliveryDate };
};
