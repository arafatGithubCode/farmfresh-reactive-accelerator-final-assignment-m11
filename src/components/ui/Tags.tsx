const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex items-center space-x-2 mb-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className={`px-2 py-1 rounded-full text-xs ${
            index === 0
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
              : index === 1
              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
              : "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
