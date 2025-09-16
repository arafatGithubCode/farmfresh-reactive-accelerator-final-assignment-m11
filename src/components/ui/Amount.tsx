import { TbCurrencyTaka } from "react-icons/tb";

const Amount = ({ hasDiscount = false }: { hasDiscount?: boolean }) => {
  return (
    <div className="text-gray-700 dark:text-gray-300 mt-1">
      <div className="flex items-center">
        <span className="font-semibold">2,000</span>
        <TbCurrencyTaka />
      </div>
      {hasDiscount && (
        <div className="flex items-center">
          <span className="line-through text-gray-400">3,000</span>
          <TbCurrencyTaka />
        </div>
      )}
    </div>
  );
};

export default Amount;
