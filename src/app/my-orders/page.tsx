import OrderItem from "@/components/my-order/OrderItem";
import { getOrdersByCustomerId, getOrdersByFarmerId } from "@/queries/order";
import { IOrderFronted } from "@/types";
import { getUserSession } from "@/utils/getUserSession";

const MyOrdersPage = async () => {
  const user = await getUserSession();
  const role = user?.role;

  if (!user || !role) {
    return (
      <div className="text-center py-16 text-gray-600 dark:text-gray-400">
        Please log in to view your orders.
      </div>
    );
  }

  const orders =
    role === "Customer"
      ? await getOrdersByCustomerId(user.id!)
      : role === "Farmer"
      ? await getOrdersByFarmerId(user.id!)
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track and manage your orders
          </p>
        </div>

        {/* Filter (optional future use) */}
        <div className="mt-4 sm:mt-0">
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order as IOrderFronted}
              role={role}
            />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No orders found yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
