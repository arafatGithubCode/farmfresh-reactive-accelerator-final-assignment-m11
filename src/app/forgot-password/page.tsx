import PasswordResetForm from "@/components/auth/PasswordResetForm";
import Link from "next/link";
import { FaArrowLeft, FaInfoCircle, FaKey } from "react-icons/fa";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-500 p-3 rounded-full">
              <FaKey className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl">
          <PasswordResetForm />
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to login
            </Link>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            <FaInfoCircle className="mr-2" />
            Need help?
          </h3>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <p>
              • Check your spam/junk folder if you don&apos;t receive the email
            </p>
            <p>• Make sure you entered the correct email address</p>
            <p>• Contact support if you continue having issues</p>
          </div>
          <div className="mt-3">
            <a
              href="#"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
            >
              Contact Support
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?
            <Link
              href="/register"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
