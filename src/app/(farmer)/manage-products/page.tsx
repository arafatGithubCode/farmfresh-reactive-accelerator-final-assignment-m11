import Pagination from "@/components/common/Pagination";
import ProductCard from "@/components/common/ProductCard";
import ManageProductFilter from "@/components/manage-products/ManageProductFilter";
import ManageProductPageTitle from "@/components/manage-products/ManageProductPageTitle";
import BreadCrumb from "@/components/ui/BreadCrumb";

const ManageProductPage = () => {
  return (
    <>
      <BreadCrumb />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ManageProductPageTitle />
        <ManageProductFilter />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard isManageListingPage={true} />
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default ManageProductPage;
