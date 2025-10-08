"use client";

import { useDeliveryInfo } from "@/hooks/useDeliveryInfo";
import { ICartItemFronted } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { getTimeRange } from "@/utils/getTimeRange";
import { useEffect, useState } from "react";

const DeliveryInfo = ({
  items,
  deliveryAddress,
}: {
  items: ICartItemFronted[];
  deliveryAddress: string;
}) => {
  const { bookingDate, sameDayDeliveryDate, regularDeliveryDate } =
    useDeliveryInfo(items);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  const sameDayDelivery =
    sameDayDeliveryDate &&
    sameDayDeliveryDate instanceof Date &&
    sameDayDeliveryDate;
  const regularDelivery =
    regularDeliveryDate &&
    regularDeliveryDate instanceof Date &&
    regularDeliveryDate;

  return (
    <div className="space-y-3 mb-6">
      <h3 className="font-semibold text-gray-900 dark:text-white">
        Delivery Information
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Booking Date:
          </span>
          <span className="text-gray-900 dark:text-white">
            {getFormattedDate(bookingDate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Delivery Date:
          </span>
          <span className="text-gray-900 dark:text-white">
            {sameDayDelivery && getFormattedDate(sameDayDelivery)}
            {regularDelivery && getFormattedDate(regularDelivery)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Delivery Time:
          </span>
          <span className="text-gray-900 dark:text-white">
            {sameDayDelivery && getTimeRange(sameDayDelivery)}
            {regularDelivery && getTimeRange(regularDelivery)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Address:</span>
          <span className="text-gray-900 dark:text-white text-right">
            {deliveryAddress}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
