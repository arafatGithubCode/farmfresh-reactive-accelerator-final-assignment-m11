"use server";

export const addProduct = async (formData: FormData) => {
  const files = formData.getAll("images") as File[];

  console.log("reun_______________");

  console.log(files);
};
