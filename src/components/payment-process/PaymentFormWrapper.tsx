"use client";

import { useCart } from "@/hooks/useCart";
import { IProductFrontend } from "@/types";
import PaymentForm from "./PaymentForm";

const PaymentFormWrapper = ({
  selectedItemProductIds = [],
  product,
  quantity,
}: {
  selectedItemProductIds?: string[];
  product?: IProductFrontend | null;
  quantity?: string;
}) => {
  const { cart } = useCart();
  const selectedItems =
    selectedItemProductIds.length > 0
      ? cart?.items?.filter((item) =>
          selectedItemProductIds.includes(item.product.id)
        )
      : [];

  const singlePurchase =
    product && quantity ? [{ product, quantity: Number(quantity) }] : [];

  if (selectedItems.length > 0) return <PaymentForm items={selectedItems} />;

  if (singlePurchase.length > 0) return <PaymentForm items={singlePurchase} />;
};

export default PaymentFormWrapper;
