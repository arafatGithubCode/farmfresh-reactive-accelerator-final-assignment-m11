import { getProducts } from "@/queries/product";

export const getNumOfCategory = async (category: string) => {
  const { products } = await getProducts({});
  const numOfCategory = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  ).length;

  return numOfCategory;
};
