import ProductDescription from "@/components/product-details/ProductDescription";
import ProductImageGallery from "@/components/product-details/ProductImageGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { showToast } from "@/providers/ToastProvider";
import { getProduct } from "@/queries/product";
import { redirect } from "next/navigation";

const ProductDetailsPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  if (!params.productId) {
    showToast("This product does not exist.", "WARNING");
    redirect("/products");
  }

  const product = await getProduct(params.productId);

  if (!product) {
    showToast("This product does not exist.", "WARNING");
    redirect("/products");
  }

  return (
    <>
      <BreadCrumb productName={product.name} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImageGallery images={product.imagesUrl} />
          <ProductInfo product={product} />
        </div>
        <ProductDescription
          description={product.description}
          farmer={product.farmer}
          reviews={product.reviews}
        />
      </div>
    </>
  );
};

export default ProductDetailsPage;
