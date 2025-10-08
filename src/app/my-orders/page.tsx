import OrderItem from "@/components/my-order/OrderItem";
import { getOrdersByCustomerId, getOrdersByFarmerId } from "@/queries/order";
import { getUserSession } from "@/utils/getUserSession";

const MyOrdersPage = async () => {
  const user = await getUserSession();
  const customerId = user?.role === "Customer" ? user?.id : null;
  const farmerId = user?.role === "Farmer" ? user?.id : null;
  const role = user?.role && user.role;

  const ordersOfCustomer =
    customerId && (await getOrdersByCustomerId(customerId));
  const ordersOfFarmer = farmerId && (await getOrdersByFarmerId(farmerId));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track and manage your orders
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>
      <div className="space-y-6">
        {ordersOfCustomer && ordersOfCustomer.length === 0 ? (
          <p>No order listed yet.</p>
        ) : (
          ordersOfCustomer &&
          ordersOfCustomer.length > 0 &&
          ordersOfCustomer.map((order) => (
            <OrderItem key={order.id} order={order} role={role!} />
          ))
        )}
      </div>
      <div className="space-y-6">
        {ordersOfFarmer && ordersOfFarmer.length === 0 ? (
          <p>No order listed yet.</p>
        ) : (
          ordersOfFarmer &&
          ordersOfFarmer.length > 0 &&
          ordersOfFarmer.map((order) => (
            <OrderItem key={order.id} order={order} role={role!} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
