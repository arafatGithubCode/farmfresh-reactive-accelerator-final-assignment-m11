import { IProductFrontend } from "@/types";
import ProductCard from "./ProductCard";

const ProductCardWrapper = ({
  products,
  isManageListingPage = false,
  viewType,
}: {
  products: IProductFrontend[];
  isManageListingPage?: boolean;
  viewType?: "GRID" | "LIST";
}) => {
  return (
    <>
      {products && products?.length === 0 ? (
        <p className="text-xs font-semibold text-gray-400">
          No products listed yet.
        </p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isManageListingPage={isManageListingPage}
            viewType={viewType}
          />
        ))
      )}
    </>
  );
};

export default ProductCardWrapper;
