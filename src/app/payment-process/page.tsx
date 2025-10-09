import PaymentFormWrapper from "@/components/payment-process/PaymentFormWrapper";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getProduct } from "@/queries/product";

const PaymentProcessPage = async ({
  searchParams: { items, productId, quantity },
}: {
  searchParams: {
    items?: string;
    productId?: string;
    quantity?: string;
  };
}) => {
  const selectedItemProductIds = items?.split(",") ?? [];
  let productData = null;
  if (productId) {
    productData = await getProduct(productId);
  }

  return (
    <>
      <BreadCrumb productId="68d6b5c494e74b14ec05152a" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PaymentFormWrapper
          selectedItemProductIds={selectedItemProductIds}
          product={productData}
          quantity={quantity}
        />
      </div>
    </>
  );
};

export default PaymentProcessPage;
