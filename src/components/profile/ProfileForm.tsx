"use client";

import { doUpdateProfile } from "@/actions/auth";
import { districts } from "@/data";
import { useCatchErr } from "@/hooks/useCatchErr";
import { useForm } from "@/hooks/useForm";
import { showToast } from "@/providers/ToastProvider";
import { IUserDB } from "@/types";
import { validateRegistrationForm } from "@/validations/validateRegistrationForm";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import ChangePassword from "../auth/ChangePassword";
import Field from "../common/Field";
import Button from "../ui/Button";
import Divider from "../ui/Divider";

const ProfileForm = ({
  user,
}: {
  user: Omit<IUserDB, "_id"> & { id: string };
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [userData, setUserData] = useState<
    Omit<IUserDB, "_id"> & { id: string }
  >(user);

  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const { catchErr } = useCatchErr();

  const {
    firstName,
    lastName,
    email,
    role,
    phone,
    address,
    bio,
    farmAddress,
    farmDistrict,
    farmName,
    farmSize,
    specialization,
    farmSizeUnit,
    image,
  } = userData;
  const initialValues = {
    firstName,
    lastName,
    email,
    role,
    phone,
    address,
    bio,
    farmAddress,
    farmDistrict,
    farmName,
    farmSize,
    specialization,
    farmSizeUnit,
    avatar: null,
    terms: false,
  };

  const {
    values: formValues,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    resetForm,
    setValues,
  } = useForm({
    initialValues,
    validate: (values) => validateRegistrationForm(values, "PROFILE"),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();

        for (const [key, value] of Object.entries(values)) {
          if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
              value.forEach((v) =>
                formData.append(key, v instanceof File ? v : String(v))
              );
            } else {
              formData.append(key, String(value));
            }
          }
        }

        const response = await doUpdateProfile(formData);
        if (response.success && response.updatedUser) {
          setUserData(response.updatedUser);
          console.log(userData);
          showToast(
            "Profile details have been updated successfully!",
            "SUCCESS"
          );
          resetForm();
          setIsEditable(false);
        } else {
          showToast("Failed to update profile details!", "ERROR");
        }
      } catch (error) {
        catchErr(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

  const avatar =
    formValues.avatar && isEditable && Array.isArray(formValues.avatar)
      ? URL?.createObjectURL(formValues.avatar[0])
      : image;

  useEffect(() => {
    if (userData) {
      setValues({
        ...userData,
        avatar: null,
        bio: userData.bio ?? "",
        farmName: userData.farmName ?? "",
        specialization: userData.specialization ?? "",
        farmSize: userData.farmSize ?? "",
        farmSizeUnit: userData.farmSizeUnit ?? "",
        farmDistrict: userData.farmDistrict ?? "",
        farmAddress: userData.farmAddress ?? "",
      });
    }
  }, [userData]);

  return (
    <div className="relative space-y-4">
      <button
        type="button"
        onClick={() => {
          setIsEditable((prev) => !prev);
          if (isEditable) {
            resetForm();
          }
        }}
        className={`px-4 py-2 text-white rounded-lg flex items-center gap-2 ${
          isEditable ? "bg-orange-400" : "bg-primary-500"
        }`}
      >
        {isEditable ? "Cancel" : "Edit Profile Details"}
        <FaUserEdit className="text-xl" />
      </button>

      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col items-center justify-center gap-1">
          <div
            onClick={() => {
              if (fileUploadRef.current) {
                fileUploadRef.current.click();
              }
            }}
            className="relative group"
          >
            <Image
              src={avatar!}
              alt="profile"
              width={200}
              height={200}
              className="rounded-full border-2 border-primary-500"
            />
            {isEditable && (
              <div className="absolute inset-0 hidden bg-primary-500 bg-opacity-50 group-hover:block rounded-full duration-200">
                <div className="w-full h-full flex items-center justify-center text-xl text-white">
                  Change Avatar
                </div>
              </div>
            )}
            <input
              disabled={!isEditable}
              id="avatar"
              name="avatar"
              type="file"
              className="sr-only"
              accept="image/*"
              ref={fileUploadRef}
              onChange={handleChange}
            />
          </div>
          <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{`${formValues.firstName} ${formValues.lastName}`}</p>
          <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {formValues.email}
          </p>
        </div>
        <Field error={touched.role && errors.role}>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Role
          </label>
          <select
            disabled={!isEditable}
            id="role"
            name="role"
            value={formValues.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
            }`}
          >
            <option value="Customer">Customer</option>
            <option value="Farmer">Farmer</option>
          </select>
          <p className="text-xs text-gray-400 mb-5">
            To become{" "}
            {formValues.role.toLowerCase() === "farmer" ? "Customer" : "Farmer"}{" "}
            change your role to{" "}
            {formValues.role.toLowerCase() === "farmer" ? "Customer" : "Farmer"}
          </p>
        </Field>
        <div className="w-full grid grid-cols-2 gap-4">
          <Field error={touched.firstName && errors.firstName}>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium  mb-1"
            >
              First Name
            </label>
            <input
              disabled={!isEditable}
              id="firstName"
              name="firstName"
              type="text"
              value={formValues.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
              }`}
              placeholder="John"
            />
          </Field>

          <Field error={touched.lastName && errors.lastName}>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium  mb-1"
            >
              Last Name
            </label>
            <input
              disabled={!isEditable}
              id="lastName"
              name="lastName"
              type="text"
              value={formValues.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
              }`}
              placeholder="John"
            />
          </Field>

          <Field error={touched.address && errors.address}>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Address
            </label>
            <textarea
              disabled={!isEditable}
              id="address"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
              }`}
              placeholder="Enter your full address"
            ></textarea>
          </Field>

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
              disabled={!isEditable}
              id="bio"
              name="bio"
              rows={3}
              value={formValues.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
              }`}
              placeholder="Tell us about yourself..."
            ></textarea>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Brief description
              </p>
              <span id="bioCounter" className="text-xs text-gray-400">
                {formValues.bio?.length}/250
              </span>
            </div>
          </Field>

          <Field error={touched.phone && errors.phone}>
            <label htmlFor="phone" className="block text-sm font-medium  mb-1">
              Phone
            </label>
            <input
              disabled={!isEditable}
              id="phone"
              name="phone"
              type="text"
              value={formValues.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
              }`}
              placeholder="I am successful trader."
            />
          </Field>

          {/* <!-- Farmer-specific fields (hidden by default) --> */}
          {formValues.role.toLowerCase() === "farmer" && (
            <>
              <Field error={touched.farmName && errors.farmName}>
                <label
                  htmlFor="farmName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Farm Name
                </label>
                <input
                  disabled={!isEditable}
                  id="farmName"
                  name="farmName"
                  type="text"
                  value={formValues.farmName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                    !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
                  }`}
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
                  disabled={!isEditable}
                  id="specialization"
                  name="specialization"
                  value={formValues.specialization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                    !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
                  }`}
                >
                  <option value="">Select specialization</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="grains">Grains</option>
                  <option value="dairy">Dairy</option>
                  <option value="mixed">Mixed Farming</option>
                </select>
              </Field>

              <Field error={touched.farmSize && errors.farmSize}>
                <label
                  htmlFor="farmSize"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Farm Size
                </label>

                <div className="flex space-x-2">
                  <input
                    disabled={!isEditable}
                    id="farmSize"
                    name="farmSize"
                    type="number"
                    value={formValues.farmSize}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="1"
                    step="0.1"
                    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
                    }`}
                    placeholder="5.5"
                  />
                  <select
                    disabled={!isEditable}
                    id="farmSizeUnit"
                    name="farmSizeUnit"
                    value={formValues.farmSizeUnit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
                    }`}
                  >
                    <option value="">Select Size Unit</option>
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
              <Field error={touched.farmDistrict && errors.farmDistrict}>
                <label
                  htmlFor="farmDistrict"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Farm District
                </label>
                <select
                  disabled={!isEditable}
                  id="farmDistrict"
                  name="farmDistrict"
                  value={formValues.farmDistrict}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                    !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
                  }`}
                >
                  <option value="">Select district</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </Field>

              <Field error={touched.farmAddress && errors.farmAddress}>
                <label
                  htmlFor="farmAddress"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Farm Address
                </label>
                <textarea
                  disabled={!isEditable}
                  id="farmAddress"
                  name="farmAddress"
                  value={formValues.farmAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={3}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                    !isEditable ? "bg-gray-100 dark:bg-gray-500" : ""
                  }`}
                  placeholder="Enter your full address"
                ></textarea>
              </Field>
            </>
          )}
        </div>

        {isEditable && (
          <Field error={touched.terms && errors.terms}>
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formValues.terms}
                onChange={handleChange}
                className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm text-gray-600 dark:text-gray-400"
              >
                I agree that the above changes made by {formValues.email}
              </label>
            </div>
          </Field>
        )}

        <div className="max-w-xl mx-auto my-5">
          {isEditable && (
            <Button
              label="Update Profile"
              loading={loading}
              loadingText="Updating..."
            />
          )}
        </div>
      </form>
      <Divider />
      <div className="flex items-end gap-1">
        <input
          type="checkbox"
          id="change-password"
          checked={isChangePassword}
          onChange={() => setIsChangePassword((prev) => !prev)}
          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label
          htmlFor="change-password"
          className="text-xs text-orange-400 font-semibold"
        >
          Want to change password?
        </label>
      </div>
      {isChangePassword && <ChangePassword />}
    </div>
  );
};

export default ProfileForm;
