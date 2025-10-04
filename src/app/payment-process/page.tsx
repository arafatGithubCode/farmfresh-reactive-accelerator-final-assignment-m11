import PaymentForm from "@/components/payment-process/PaymentForm";
import BreadCrumb from "@/components/ui/BreadCrumb";

const PaymentProcessPage = ({
  searchParams: { items },
}: {
  searchParams: { items: string };
}) => {
  const selectedItemProductIds = items?.split(",") ?? [];
  return (
    <>
      <BreadCrumb productId="68d6b5c494e74b14ec05152a" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PaymentForm selectedItemProductIds={selectedItemProductIds} />
      </div>
    </>
  );
};

export default PaymentProcessPage;
