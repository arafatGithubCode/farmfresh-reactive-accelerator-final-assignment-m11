"use client";

import Button from "../ui/Button";

type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
};

const ConfirmedCancelOrder = ({
  message,
  title,
  onCancel,
  onConfirm,
  loading,
}: Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
        {title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        {message}
      </p>

      <div className="flex justify-between items-center gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          No, Keep It
        </button>
        <Button
          label="Yest, Cancel Order"
          loading={loading}
          loadingText="Canceling..."
          fullWidth={false}
          variant="danger"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default ConfirmedCancelOrder;
