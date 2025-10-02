import Pagination from "@/components/common/Pagination";
import ProductCardWrapper from "@/components/common/ProductCardWrapper";
import ManageProductFilter from "@/components/manage-products/ManageProductFilter";
import ManageProductPageTitle from "@/components/manage-products/ManageProductPageTitle";
import AccessDenied from "@/components/ui/AccessDenied";
import { showToast } from "@/providers/ToastProvider";
import { getProductsByFarmerId } from "@/queries/product";
import { getUserSession } from "@/utils/getUserSession";

const ManageProductPage = async () => {
  const userSession = await getUserSession();
  const farmerId = userSession?.id;
  const products = await getProductsByFarmerId(farmerId!);

  if (userSession?.role !== "Farmer")
    showToast("Only farmer can access manage product page.", "WARNING");

  return userSession?.role === "Farmer" ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ManageProductPageTitle />
      <ManageProductFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCardWrapper products={products} isManageListingPage={true} />
      </div>
      <Pagination />
    </div>
  ) : (
    <AccessDenied allowedRole="Farmer" path="Manage-Product page" />
  );
};

export default ManageProductPage;
