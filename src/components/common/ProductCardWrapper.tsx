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
      {products.map((product) => {
        const isActive = product.isActive;
        return (
          isActive && (
            <ProductCard
              key={product.id}
              product={product}
              isManageListingPage={isManageListingPage}
            />
          )
        );
      })}
    </>
  );
};

export default ProductCardWrapper;
