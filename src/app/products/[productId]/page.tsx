import ProductDescription from "@/components/product-details/ProductDescription";
import ProductImageGallery from "@/components/product-details/ProductImageGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import ReviewSection from "@/components/product-details/ReviewSection";
import BreadCrumb from "@/components/ui/BreadCrumb";
import { showToast } from "@/providers/ToastProvider";
import { getProduct } from "@/queries/product";
import {
  getReviewsByProductId,
  getSingleReviewByProductIdAndCustomerId,
} from "@/queries/review";
import { getUserSession } from "@/utils/getUserSession";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Local Farmer Booking - Fresh Produce Direct from Farmers",
  description:
    "**FarmFresh** is a web platform that connects farmers directly to customers, allowing them to sell their fresh farm products without any middlemen. It ensures transparency, fairness, and freshness for both farmers and consumers.",
  openGraph: {
    images: [
      {
        url: `${process.env.BASE_URL}/api/og`,
        width: 1200,
        height: 600,
      },
    ],
  },
};

export async function generateMetadata({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const productInfo = await getProduct(productId);

  return {
    title: `Farmfresh - ${productInfo?.name}`,
    description: productInfo?.description,
    openGraph: {
      images: [productInfo?.imagesUrl[0].url],
    },
  };
}

const ProductDetailsPage = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const user = await getUserSession();
  const customerId = user?.id;

  if (!productId) {
    showToast("This product does not exist.", "WARNING");
    redirect("/products");
  }

  const product = await getProduct(productId);

  if (!product) {
    showToast("This product does not exist.", "WARNING");
    redirect("/products");
  }

  const reviews = await getReviewsByProductId(productId);
  const loggedInUserReview = await getSingleReviewByProductIdAndCustomerId(
    customerId!,
    productId
  );

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
          loggedInUserReview={loggedInUserReview!}
          productId={productId}
        />
        {reviews && reviews.length === 0 ? (
          <p>No reviews added yet.</p>
        ) : (
          <ReviewSection
            reviews={reviews}
            productId={productId}
            loggedInUserReview={loggedInUserReview!}
          />
        )}
      </div>
    </>
  );
};

export default ProductDetailsPage;
