import { auth } from "@/auth";
import AuthInterceptedModal from "@/components/auth/AuthInterceptedModal";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { FaSeedling } from "react-icons/fa6";

const LoginInterceptPage = async () => {
  const session = await auth();

  if (session) {
    return null;
  }
  return (
    <AuthInterceptedModal>
      <div className="max-w-md w-full mx-auto space-y-8 bg-gray-200 dark:bg-gray-900 px-5 py-2 rounded shadow-lg drop-shadow-lg shadow-white/40 mt-5 absolute left-0 right-0 top-16">
        {/* <!-- Header --> */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-500 p-3 rounded-full">
              <FaSeedling className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to your FarmFresh account
          </p>
        </div>

        {/* <!-- Login Form --> */}
        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl">
          <LoginForm />

          {/* <!-- Register Link --> */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?
              <Link
                href="/register"
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* <!-- Demo Accounts --> */}
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            Demo Accounts:
          </h3>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <div>
              <strong>Customer:</strong> customer@demo.com / password123
            </div>
            <div>
              <strong>Farmer:</strong> farmer@demo.com / password123
            </div>
          </div>
        </div>
      </div>
    </AuthInterceptedModal>
  );
};

export default LoginInterceptPage;
