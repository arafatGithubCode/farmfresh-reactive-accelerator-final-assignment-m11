"use client";

import Button from "../ui/Button";
import CloseBtn from "../ui/CloseBtn";

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
        <CloseBtn level="No, Keep It" onClose={onCancel} />
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
