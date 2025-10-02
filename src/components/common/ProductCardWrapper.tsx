import { IProductFrontend } from "@/types";
import ProductCard from "./ProductCard";

const ProductCardWrapper = ({
  products,
  isManageListingPage = false,
}: {
  products: IProductFrontend[];
  isManageListingPage?: boolean;
}) => {
  return (
    <>
      {products && products.length === 0 ? (
        <p className="text-xs font-semibold text-gray-400">
          No products listed yet
        </p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isManageListingPage={isManageListingPage}
          />
        ))
      )}
    </>
  );
};

export default ProductCardWrapper;
