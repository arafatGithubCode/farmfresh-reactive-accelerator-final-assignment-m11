import OrderSummary from "@/components/payment-process/OrderSummary";
import PaymentForm from "@/components/payment-process/PaymentForm";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { getProduct } from "@/queries/product";

const PaymentProcessPage = async ({
  params: { productId },
  searchParams: { q },
}: {
  params: { productId: string };
  searchParams: { q: string };
}) => {
  const product = await getProduct(productId);
  console.log(product, q);
  return (
    <>
      <BreadCrumb productId="68d6b5c494e74b14ec05152a" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OrderSummary />
          <PaymentForm />
        </div>
      </div>
    </>
  );
};

export default PaymentProcessPage;
