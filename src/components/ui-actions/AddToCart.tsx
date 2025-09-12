// import { doAddingCart } from "@/actions/product";
import { IProductFrontend } from "@/types";

const AddToCart = ({
  product,
  customerId,
}: {
  product: IProductFrontend;
  customerId: string;
}) => {
  return (
    <form>
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition"
      >
        Add to Cart
      </button>
    </form>
  );
};

export default AddToCart;
