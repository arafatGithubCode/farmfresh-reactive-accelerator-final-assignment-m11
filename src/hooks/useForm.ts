"use client";

import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";

type validationErrors<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<keyof T, unknown>>(options: {
  initialValues: T;
  validate: (values: T) => validationErrors<T>;
  onSubmit: (values: T) => void | Promise<void>;
}) => {
  const { initialValues, validate, onSubmit } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<validationErrors<T>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialValues).reduce(
      (acc, key) => ({
        ...acc,
        [key]: false,
      }),
      {} as Record<keyof T, boolean>
    )
  );

  // handle change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    let newValue;
    if (type === "file" && files) {
      newValue = Array.from(files);
    } else if (type === "file" && !files) {
      newValue = null;
    } else if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }

    const newValues = { ...values, [name]: newValue };

    setValues(newValues);

    const fieldErrors = validate(newValues);

    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof T],
    }));
  };

  // handle blur
  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const filedErrors = validate(values);

    if (filedErrors[name as keyof T]) {
      setErrors((prev) => ({
        ...prev,
        [name]: filedErrors[name as keyof T],
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof T];
        return newErrors;
      });
    }
  };

  // onSubmit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(values);

    if (
      validationErrors &&
      Object.values(validationErrors).some((field) => field)
    ) {
      setErrors(validationErrors);
      setTouched(
        Object.keys(values).reduce(
          (acc, key) => ({
            ...acc,
            [key]: true,
          }),
          {} as Record<keyof T, boolean>
        )
      );
      return;
    }
    await onSubmit(values);
  };

  //   reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched(
      Object.keys(values).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {} as Record<keyof T, boolean>
      )
    );
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    resetForm,
  };
};
