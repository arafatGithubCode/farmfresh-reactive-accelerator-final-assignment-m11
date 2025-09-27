import Divider from "@/components/ui/Divider";
import { FaPen } from "react-icons/fa";

const EditProductPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow w-full max-w-5xl">
        <div className="flex items-center gap-2">
          <p className="text-md font-semibold">Update Product</p>
          <FaPen className="text-md text-primary-500" />
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default EditProductPage;
