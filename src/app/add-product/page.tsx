import ProductForm from "@/components/common/ProductForm";
import AccessDenied from "@/components/ui/AccessDenied";
import { showToast } from "@/providers/ToastProvider";
import { IProductForm } from "@/types";
import { getUserSession } from "@/utils/getUserSession";

const initialValues: IProductForm<File[]> = {
  name: "",
  category: "",
  description: "",
  price: 0,
  discountRate: 0,
  unit: "",
  stock: 0,
  images: [],
  harvestDate: "",
  features: [],
  deliveryMethod: "",
  baseDeliveryFee: 0,
  perUnitDeliveryFee: 0,
  serviceFee: 0,
  isActive: true,
};

const AddProductPage = async () => {
  const userSession = await getUserSession();

  if (userSession?.role !== "Farmer")
    showToast("Only farmer can access add product page.", "WARNING");

  return userSession?.role === "Farmer" ? (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary-600 text-white px-8 py-6">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-primary-100 mt-2">
            Share your fresh produce with customers
          </p>
        </div>
        <ProductForm initialValues={initialValues} mode="ADD" />
      </div>
    </div>
  ) : (
    <AccessDenied allowedRole="Farmer" path="Add-Product page" />
  );
};

export default AddProductPage;
