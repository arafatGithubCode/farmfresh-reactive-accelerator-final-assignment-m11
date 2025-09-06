const PriceFilter = () => {
  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
        Price Range
      </h4>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="price"
            className="border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Under ৳30
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="price"
            className="border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            ৳30 - ৳50
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="price"
            className="border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            ৳50 - ৳100
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="price"
            className="border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Over ৳100
          </span>
        </label>
      </div>
    </div>
  );
};

export default PriceFilter;
