const OrganicFilter = () => {
  return (
    <div className="mb-6">
      <label className="flex items-center">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
        />
        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          Organic Only
        </span>
      </label>
    </div>
  );
};

export default OrganicFilter;
