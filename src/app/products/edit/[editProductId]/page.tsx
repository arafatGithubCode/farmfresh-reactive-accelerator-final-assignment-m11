import ProductForm from "@/components/common/ProductForm";
import AccessDenied from "@/components/ui/AccessDenied";
import { showToast } from "@/providers/ToastProvider";
import { getProduct } from "@/queries/product";
import { IProductForm } from "@/types";
import { getUserSession } from "@/utils/getUserSession";
import { redirect } from "next/navigation";

const EditProductPage = async ({
  params,
}: {
  params: { editProductId: string };
}) => {
  const userSession = await getUserSession();

  if (userSession?.role !== "Farmer") {
    showToast("Only farmer can access edit product page.", "WARNING");
    redirect("/products");
  }

  if (!params.editProductId) {
    showToast("This product does not exist.", "WARNING");
    redirect("/products");
  }

  const product = await getProduct(params.editProductId);

  if (!product) {
    showToast("This product does not exist.", "WARNING");
    redirect("/products");
  }

  const initialValues: IProductForm<string[]> = {
    name: product.name,
    category: product.category,
    description: product.description,
    images: product.imagesUrl,
    price: product.price,
    stock: product.stock,
    unit: product.unit,
    isActive: product.isActive,
    features: product.features,
    discountRate: product.discountRate,
    harvestDate: product.harvestDate,
    deliveryMethod: product.deliveryMethod,
    baseDeliveryFee: product.baseDeliveryFee,
    perUnitDeliveryFee: product.perUnitDeliveryFee,
    serviceFee: product.serviceFee,
  };

  return userSession?.role === "Farmer" ? (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-orange-400 text-white px-8 py-6">
          <h1 className="text-3xl font-bold">Edit Product&apos;s Details</h1>
          <p className="text-primary-100 mt-2">
            You are editing {product.name}
          </p>
        </div>
        <ProductForm initialValues={initialValues} mode="EDIT" />
      </div>
    </div>
  ) : (
    <AccessDenied allowedRole="Farmer" path="Edit-Product page" />
  );
};

export default EditProductPage;
