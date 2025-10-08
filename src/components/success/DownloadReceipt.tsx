"use client";

import { IOrderFronted } from "@/types";
import { FaDownload } from "react-icons/fa";

const DownloadReceipt = ({ order }: { order: IOrderFronted }) => {
  console.log(order);
  return (
    <>
      <button
        onClick={() => {
          // TODO:
        }}
        className="flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
      >
        <FaDownload className="mr-2" />
        Download Receipt (PDF)
      </button>
    </>
  );
};

export default DownloadReceipt;
