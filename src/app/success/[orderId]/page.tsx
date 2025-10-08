import DownloadReceipt from "@/components/common/DownloadReceipt";
import DeliveryInfo from "@/components/success/DeliveryInfo";

import PaymentSummary from "@/components/success/PaymentSummary";
import { getOrderById } from "@/queries/order";
import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaEnvelope, FaHome, FaList } from "react-icons/fa";

const SuccessPage = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const order = await getOrderById(orderId);

  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* <!-- Success Icon and Message --> */}
      <div className="text-center mb-12">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 mb-6">
          <FaCheck className="text-4xl text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Successful!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
          Thank you for your order
        </p>
        <p className="text-gray-500 dark:text-gray-500">Order #{order.id}</p>
      </div>

      {/* <!-- Email Confirmation Notice --> */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <div className="flex items-center">
          <FaEnvelope className="text-blue-600 dark:text-blue-400 mr-3" />
          <div>
            <p className="font-medium text-blue-900 dark:text-blue-100">
              Email Confirmation Sent
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              We&apos;ve sent your order confirmation and receipt to your email
              address.
            </p>
          </div>
        </div>
      </div>

      {/* <!-- Order Details --> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Order Details
          </h2>

          {order.items &&
            order.items.length > 0 &&
            order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="w-16 h-16 rounded-lg relative">
                  <Image
                    src={item.product.imagesUrl[0].url}
                    alt="Fresh Tomatoes"
                    fill={true}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By {`${item.product.farmer.firstName}'`} Farm
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {item.quantity} {item.product.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ৳{item.product.price}
                  </p>
                </div>
              </div>
            ))}

          <DeliveryInfo
            items={order.items}
            deliveryAddress={order.deliveryAddress}
          />
        </div>
        <PaymentSummary
          items={order.items}
          paymentMethod={order.paymentMethod.method}
          bookingDate={order.bookingDate}
          orderId={order.id}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <DownloadReceipt order={order} />
        <Link
          href="/my-orders"
          className="flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition"
        >
          <FaList className="mr-2" />
          View All Orders
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center px-8 py-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition"
        >
          <FaHome className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
