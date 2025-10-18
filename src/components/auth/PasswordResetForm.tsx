"use client";

import { doResetPassword } from "@/actions/auth";
import { showToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import Button from "../ui/Button";

const PasswordResetForm = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const result = await doResetPassword(formData);

    if (result?.success) {
      showToast("Password reset link sent successfully!", "SUCCESS");
      router.push(`/reset-password?email=${result.email}`);
    } else {
      showToast(result?.message || "Something went wrong", "ERROR");
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6" id="resetForm">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="john@example.com"
          />
          <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      <Button
        label="Send Reset Link"
        icon={<FaPaperPlane className="mr-2" />}
        hasSpinner={true}
        loadingText="Reset Link Sending..."
      />
      <div
        id="successMessage"
        className="hidden bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4"
      >
        <div className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-3" />
          <div>
            <h4 className="text-green-800 dark:text-green-200 font-medium">
              Email sent successfully!
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">
              Check your email for password reset instructions.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PasswordResetForm;
