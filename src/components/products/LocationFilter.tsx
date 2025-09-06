const LocationFilter = () => {
  return (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 dark:text-white mb-3">
        Location
      </h4>
      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
        <option>All Locations</option>
        <option>Dhaka</option>
        <option>Chittagong</option>
        <option>Sylhet</option>
        <option>Rangpur</option>
      </select>
    </div>
  );
};

export default LocationFilter;
