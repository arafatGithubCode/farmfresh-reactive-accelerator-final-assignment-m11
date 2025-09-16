import CartDetails from "@/components/cart/CartDetails";
import { getCartByCustomerId } from "@/queries/cart";
import { getUserSession } from "@/utils/getUserSession";

const CartPage = async () => {
  const user = await getUserSession();
  const customerId = user?.id;

  const cart = await getCartByCustomerId(customerId!);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <CartDetails cart={cart!} />
    </div>
  );
};

export default CartPage;
