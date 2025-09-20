import { TbCurrencyTaka } from "react-icons/tb";

const Amount = ({
  discount = 0,
  isRow = false,
  amount,
}: {
  discount?: number;
  isRow?: boolean;
  amount: number;
}) => {
  return (
    <div
      className={`text-gray-700 dark:text-gray-300 mt-1 ${
        isRow ? "flex" : "flex flex-col"
      }`}
    >
      <div className="flex items-center relative">
        <span className="font-semibold">
          {Math.round(amount - discount).toLocaleString()}
        </span>
        <TbCurrencyTaka />
      </div>
      {discount > 0 && (
        <div className="flex items-center">
          <span className="line-through text-red-400">
            {Math.round(amount).toLocaleString()}
          </span>
          <TbCurrencyTaka className="text-red-400" />
        </div>
      )}
    </div>
  );
};

export default Amount;
