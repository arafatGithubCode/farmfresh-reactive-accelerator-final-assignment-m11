const Divider = ({ isDotted = false }: { isDotted?: boolean }) => {
  return (
    <div
      className={`w-full my-2 border-gray-200 dark:border-gray-500 ${
        isDotted
          ? "border-dotted border-t-[2px]"
          : "border-solid border-t-[1px]"
      }`}
    />
  );
};

export default Divider;
