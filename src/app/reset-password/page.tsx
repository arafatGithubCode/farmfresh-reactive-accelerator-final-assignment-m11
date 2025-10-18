import VerifyResetKeyForm from "@/components/auth/VerifyResetKeyForm";
import Link from "next/link";
import { FaCheck, FaEnvelope, FaInfoCircle } from "react-icons/fa";

const ResetPasswordPage = ({
  searchParams: { email },
}: {
  searchParams: { email: string };
}) => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="text-center mb-2">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 mb-6">
            <FaCheck className="text-green-600 dark:text-green-400 text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Reset link sent successfully.
          </h1>
        </div>
      </div>
      <div className="mt-8 mb-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <div className="flex items-center">
          <FaEnvelope className="text-blue-600 dark:text-blue-400 mr-3" />
          <div>
            <p className="font-medium text-blue-900 dark:text-blue-100">
              Email Confirmation Sent
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              A reset key has been sent to your email address ({email}). Please
              use it to securely reset your password.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full space-y-8">
        <VerifyResetKeyForm />
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
            Don&apos;t receive the reset link?
            <Link
              href="/forgot-password"
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              sent again
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
