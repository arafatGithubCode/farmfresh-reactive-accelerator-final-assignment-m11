import { getProductsByFarmerId } from "@/queries/product";
import { IUserDB } from "@/types";
import Image from "next/image";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaCertificate, FaPhone, FaStar } from "react-icons/fa6";
import Tags from "../ui/Tags";

const FarmerCard = async ({
  farmer,
}: {
  farmer: Omit<IUserDB, "_id"> & { id: string };
}) => {
  const {
    image,
    firstName,
    lastName,
    farmDistrict,
    bio,
    farmSize,
    farmSizeUnit,
    id,
  } = farmer;
  const products = await getProductsByFarmerId(id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <Image
          src={image!}
          alt="Rahim Ahmed"
          className="w-full h-64 object-cover"
          width={300}
          height={300}
        />
        <div className="absolute top-4 right-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <FaCertificate className="mr-1" />
            Certified
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {firstName + " " + lastName}
          </h3>
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <span className="text-gray-600 dark:text-gray-400 ml-1">4.8</span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          <FaMapMarkedAlt className="mr-2" /> {farmDistrict}, Bangladesh
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4">
          {bio}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Farm Size:</span> {farmSize}{" "}
            {farmSizeUnit}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Product(s):</span> {products.length}
          </div>
        </div>
        <div className="flex space-x-2 mb-4">
          {products[0]?.features?.length > 0 ? (
            <Tags tags={products[0].features} />
          ) : (
            <div className="w-full h-[22px]" />
          )}
        </div>
        <div className="flex space-x-3">
          <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition">
            View Products
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <FaPhone />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerCard;
