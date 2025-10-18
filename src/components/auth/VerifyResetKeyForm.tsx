"use client";

import { doVerifyResetKey } from "@/actions/auth";
import { useForm } from "@/hooks/useForm";
import { showToast } from "@/providers/ToastProvider";
import { IResetForm } from "@/types";
import { catchErr } from "@/utils/catchErr";
import { validateResetForm } from "@/validations/validateResetForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Field from "../common/Field";
import Button from "../ui/Button";

const initialValues: IResetForm = {
  email: "",
  resetKey: "",
  newPassword: "",
  confirmPassword: "",
};

const VerifyResetKeyForm = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    values: FormValues,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useForm({
    initialValues,
    validate: validateResetForm,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
          formData.append(key, value);
        }

        const response = await doVerifyResetKey(formData);

        if (!response.success) {
          showToast(response.message, "ERROR");
        } else {
          showToast(response.message);
          resetForm();
          router.push("/login");
        }
      } catch (error) {
        const errMsg = catchErr(error);
        showToast(errMsg.error, "ERROR");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-2xl flex flex-col gap-3"
    >
      <Field error={touched.resetKey && errors.resetKey}>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          htmlFor="resetKey"
        >
          Reset Key
        </label>
        <input
          type="text"
          name="resetKey"
          id="resetKey"
          value={FormValues.resetKey}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your reset key"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </Field>
      <Field error={touched.email && errors.email}>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={FormValues.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </Field>
      <Field error={touched.newPassword && errors.newPassword}>
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          htmlFor="newPassword"
        >
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          value={FormValues.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your new password"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </Field>
      <Field error={touched.confirmPassword && errors.confirmPassword}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={FormValues.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter your confirm password"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </Field>
      <Button
        label="Update Password"
        hasSpinner={true}
        loadingText="Updating..."
        loading={loading}
      />
      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to login
        </Link>
      </div>
    </form>
  );
};

export default VerifyResetKeyForm;
