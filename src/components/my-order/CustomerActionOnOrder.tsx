"use client";

import { IOrderFronted } from "@/types";
import { Fragment, useState } from "react";
import { FaRedo, FaStar } from "react-icons/fa";
import DownloadReceipt from "../common/DownloadReceipt";
import WriteReview from "../common/WriteReview";
import Popup from "../ui/Popup";

const CustomerActionOnOrder = ({ order }: { order: IOrderFronted }) => {
  const [showReviewPopup, setShowReviewPopup] = useState<boolean>(false);

  return (
    <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex flex-wrap gap-3">
      {/* Delivered / Shipped / Confirmed */}
      {["CONFIRMED", "SHIPPED", "DELIVERED"].includes(order.status) && (
        <Fragment>
          <DownloadReceipt order={order} />
          <button
            type="button"
            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition"
          >
            <FaRedo className="mr-2" />
            Reorder
          </button>
        </Fragment>
      )}

      {/* Delivered → Write Review */}
      {order.status === "DELIVERED" && (
        <>
          <button
            type="button"
            onClick={() => setShowReviewPopup(true)}
            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition"
          >
            <FaStar className="mr-2" />
            Write Review
          </button>
          {showReviewPopup && order.items.length === 1 && (
            <Popup onClose={() => setShowReviewPopup(false)}>
              <WriteReview
                customerId={order.customer.id}
                productId={order.items[0].product.id}
              />
            </Popup>
          )}
        </>
      )}

      {/* Placed (waiting for farmer) */}
      {order.status === "PLACED" && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Waiting for farmer confirmation
        </p>
      )}
    </div>
  );
};

export default CustomerActionOnOrder;
