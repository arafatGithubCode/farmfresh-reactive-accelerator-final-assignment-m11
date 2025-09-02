import AddProductForm from "@/components/add-product/AddProductForm";
import AccessDenied from "@/components/ui/AccessDenied";
import BreadCrumb from "@/components/ui/BreadCrumb";
import Toast from "@/components/ui/Toast";
import { getUserSession } from "@/utils/getUserSession";

const AddProductPage = async () => {
  const userSession = await getUserSession();

  return userSession?.role === "Farmer" ? (
    <>
      <BreadCrumb />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-primary-600 text-white px-8 py-6">
            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-primary-100 mt-2">
              Share your fresh produce with customers
            </p>
          </div>
          <AddProductForm />
        </div>
      </div>
    </>
  ) : (
    <>
      <AccessDenied allowedRole="Farmer" path="Add-Product page" />
      <Toast
        mode="WARNING"
        message="Only farmer can access add product page."
      />
    </>
  );
};

export default AddProductPage;
