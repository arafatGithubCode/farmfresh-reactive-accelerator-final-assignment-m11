"use client";

import { doCredentialLogIn } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import SubmitBtn from "../ui/SubmitBtn";
import Toast from "../ui/Toast";
import GoogleAuth from "./GoogleAuth";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await doCredentialLogIn(formData);
      console.log(result);
      if (result?.error) {
        setLoading(false);
        setError("Wrong Credentials!");
      }
      setLoading(false);
      router.push("/product");
      router.back();
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Wrong Credentials!");
    }
  };
  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="john@example.com"
            />
            <i className="fas fa-envelope absolute left-3 top-3.5 text-gray-400"></i>
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="••••••••"
            />
            <i className="fas fa-lock absolute left-3 top-3.5 text-gray-400"></i>
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <i className="fas fa-eye text-gray-400 hover:text-gray-600"></i>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-600 dark:text-gray-400"
            >
              Remember me
            </label>
          </div>
          <a
            href="forgot-password.html"
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            Forgot password?
          </a>
        </div>

        <SubmitBtn label="Sign In" loading={loading} />

        {/* <!-- Divider --> */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* <!-- Social Login --> */}
        <GoogleAuth />
      </form>
      {error && <Toast mode="ERROR" message={error} />}
    </>
  );
};

export default LoginForm;
