"use client";

import { doRegistration } from "@/actions/auth";
import {
  IUserRegistrationForm,
  RegistrationFormValidationError,
} from "@/types";
import { resetForm } from "@/utils/resetForm";
import { validateRegistrationForm } from "@/validations/validateRegistrationForm";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FocusEvent, FormEvent, useRef, useState } from "react";
import { FaCamera, FaEye, FaEyeSlash, FaSeedling } from "react-icons/fa6";
import Field from "../common/Field";
import SubmitBtn from "../ui/SubmitBtn";
import Toast from "../ui/Toast";
import GoogleAuth from "./GoogleAuth";

const initialValues: IUserRegistrationForm = {
  role: "Customer",
  avatar: null,
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
  phone: "",
  bio: "",
  farmName: "",
  specialization: "",
  farmSize: "",
  farmSizeUnit: "",
  terms: false,
};

const RegisterForm = () => {
  const [formValues, setFormValues] =
    useState<IUserRegistrationForm>(initialValues);
  const [errors, setErrors] = useState<RegistrationFormValidationError>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({
    role: false,
    type: false,
    avatar: false,
    firstName: false,
    lastName: false,
    email: false,
    address: false,
    password: false,
    confirmPassword: false,
    phone: false,
    bio: false,
    farmName: false,
    specialization: false,
    farmSize: false,
    farmSizeUnit: false,
    terms: false,
  });

  const [submitErr, setSubmitErr] = useState<{ general?: string } | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);

  //   onBlur: (when leaving field)
  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate this field only
    const fieldErrors = validateRegistrationForm(formValues);
    if (fieldErrors[name as keyof RegistrationFormValidationError]) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof RegistrationFormValidationError],
      }));
    } else {
      // clear errors if user fixed it
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof RegistrationFormValidationError];
        return newErrors;
      });
    }
  };

  //   onChange: update form value + live validation
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    setFormValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files?.[0] || null
          : value,
    }));

    const fieldErrors = validateRegistrationForm({
      ...formValues,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files?.[0] || null
          : value,
    });

    if (fieldErrors[name as keyof RegistrationFormValidationError]) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof RegistrationFormValidationError],
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof RegistrationFormValidationError];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitErr(null);
    setLoading(true);

    try {
      // check field validation and return error
      const validationErrors = validateRegistrationForm(formValues);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setTouched(
          Object.keys(formValues).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          )
        );
        setLoading(false);
        return;
      }

      const formData = new FormData();
      for (const [key, value] of Object.entries(formValues)) {
        formData.append(key, value);
      }

      const result = await doRegistration(formData);
      if (!result.success) {
        setSubmitErr({ general: result.error });
        setLoading(false);
        return;
      }

      setFormValues(resetForm());
      router.refresh();
      router.push("/login");
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setSubmitErr({ general: err.message });
      }
      if (typeof err === "string") {
        setSubmitErr({ general: err });
      }
      setSubmitErr({ general: "Registration Failed" });
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {submitErr?.general && (
          <p className="text-red-500 text-sm text-center">
            {submitErr.general}
          </p>
        )}
        <Field error={touched.role && errors.role}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            I want to register as:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative group">
              <input
                type="radio"
                name="role"
                value="Customer"
                onChange={handleChange}
                checked={formValues.role === "Customer"}
                className="sr-only peer"
              />
              <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900 hover:border-primary-300 dark:hover:border-primary-400 transition-all duration-200">
                <div className="text-center">
                  <FaSeedling className="text-2xl mb-3 text-gray-600 dark:text-gray-400 peer-checked:text-primary-600 group-hover:text-primary-500 transition-colors" />
                  <div className="font-semibold text-gray-900 dark:text-white peer-checked:text-primary-700 dark:peer-checked:text-primary-300">
                    Customer
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Buy fresh produce
                  </div>
                </div>
              </div>
            </label>
            <label className="relative group">
              <input
                type="radio"
                name="role"
                value="Farmer"
                onChange={handleChange}
                onBlur={handleBlur}
                checked={formValues.role === "Farmer"}
                className="sr-only peer"
              />
              <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900 hover:border-primary-300 dark:hover:border-primary-400 transition-all duration-200">
                <div className="text-center">
                  <FaSeedling className="text-2xl mb-3 text-gray-600 dark:text-gray-400 peer-checked:text-primary-600 group-hover:text-primary-500 transition-colors" />
                  <div className="font-semibold text-gray-900 dark:text-white peer-checked:text-primary-700 dark:peer-checked:text-primary-300">
                    Farmer
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Sell your produce
                  </div>
                </div>
              </div>
            </label>
          </div>
        </Field>
        {/* <!-- Profile Picture Upload - Full Width --> */}
        <Field error={touched.avatar && errors.avatar}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Profile Picture
          </label>
          <div className="flex items-center justify-center space-x-6">
            {/* <!-- Image Preview --> */}
            <div
              className="shrink-0"
              onClick={() => {
                if (fileUploadRef.current) {
                  fileUploadRef.current?.click();
                }
              }}
            >
              <Image
                id="profilePreview"
                className="h-20 w-20 object-cover rounded-full border-2 border-gray-300 dark:border-gray-600"
                src={
                  formValues.avatar && formValues.avatar instanceof File
                    ? URL.createObjectURL(formValues.avatar)
                    : "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23e5e7eb'/%3e%3ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' fill='%236b7280'%3ePhoto%3c/text%3e%3c/svg%3e"
                }
                alt="Profile preview"
                width={50}
                height={50}
              />
            </div>
            {/* <!-- Upload Button --> */}
            <div className="flex-1 max-w-xs">
              <label
                htmlFor="avatar"
                className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 transition block text-center"
              >
                <span className="flex items-center justify-center">
                  <FaCamera className="mr-2" />
                  Choose photo
                </span>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  ref={fileUploadRef}
                  onChange={handleChange}
                />
              </label>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>
          </div>
        </Field>

        {/* <!-- Two Column Layout for Form Fields --> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <!-- Left Column --> */}
          <div className="space-y-4">
            {/* <!-- First Name --> */}
            <Field error={touched.firstName && errors.firstName}>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formValues.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="John"
              />
            </Field>
            {/* <!-- Email --> */}
            <Field error={touched.lastName && errors.email}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="john@example.com"
              />
            </Field>

            {/* <!-- Address --> */}
            <Field error={touched.address && errors.address}>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Enter your full address"
              ></textarea>
            </Field>
            <div className="w-full h-[3px]" />
            {/* <!-- Password --> */}
            <Field error={touched.password && errors.password}>
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
                  type={showPass ? "text" : "password"}
                  value={formValues.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  onClick={() => setShowPass((prev) => !prev)}
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPass ? (
                    <FaEye className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </Field>
          </div>

          {/* <!-- Right Column --> */}
          <div className="space-y-4">
            {/* <!-- Last Name --> */}
            <Field error={touched.lastName && errors.lastName}>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formValues.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Doe"
              />
            </Field>

            {/* <!-- Phone --> */}
            <Field error={touched.phone && errors.phone}>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="+880 1234 567890"
              />
            </Field>

            {/* <!-- Bio --> */}
            <Field error={touched.bio && errors.bio}>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Bio
                <span className="text-gray-400 text-xs font-normal">
                  (Optional)
                </span>
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formValues.bio}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Tell us about yourself..."
              ></textarea>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Brief description
                </p>
                <span id="bioCounter" className="text-xs text-gray-400">
                  0/250
                </span>
              </div>
            </Field>

            {/* <!-- Confirm Password --> */}
            <Field error={touched.confirmPassword && errors.confirmPassword}>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPass ? "text" : "password"}
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  onClick={() => setShowConfirmPass((prev) => !prev)}
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPass ? (
                    <FaEye className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </Field>
          </div>
        </div>

        {/* <!-- Farmer-specific fields (hidden by default) --> */}
        {formValues.role.toLowerCase() === "farmer" && (
          <div id="farmerFields" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Field error={touched.farmName && errors.farmName}>
                <label
                  htmlFor="farmName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Farm Name
                </label>
                <input
                  id="farmName"
                  name="farmName"
                  type="text"
                  value={formValues.farmName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Green Valley Farm"
                />
              </Field>
              <Field error={touched.specialization && errors.specialization}>
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Specialization
                </label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formValues.specialization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select specialization</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="dairy">Dairy</option>
                  <option value="mixed">Mixed Farming</option>
                </select>
              </Field>
            </div>
            <Field error={touched.farmSize && errors.farmSize}>
              <label
                htmlFor="farmSize"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Farm Size
              </label>

              <div className="flex space-x-2">
                <input
                  id="farmSize"
                  name="farmSize"
                  type="number"
                  value={formValues.farmSize}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  step="0.1"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="5.5"
                />
                <select
                  id="farmSizeUnit"
                  name="farmSizeUnit"
                  value={formValues.farmSizeUnit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-24 px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                  <option value="sq_ft">Sq Ft</option>
                  <option value="sq_m">Sq M</option>
                </select>
              </div>
              {errors.farmSizeUnit && (
                <p className="text-red-400 text-xs my-1 text-right w-full">
                  {errors.farmSizeUnit}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter the total area of your farm
              </p>
            </Field>
          </div>
        )}

        {/* <!-- Terms and Conditions --> */}
        <Field error={touched.terms && errors.terms}>
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={formValues.terms}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, terms: e.target.checked }))
              }
              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-600 dark:text-gray-400"
            >
              I agree to the
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms and Conditions
              </a>
              and
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </label>
          </div>
        </Field>

        {/* <!-- Submit Button --> */}
        <SubmitBtn label="Create Account" loading={loading} />

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
        <GoogleAuth />
      </form>
      {!!submitErr && <Toast mode="ERROR" message={submitErr.general} />}
    </>
  );
};

export default RegisterForm;
