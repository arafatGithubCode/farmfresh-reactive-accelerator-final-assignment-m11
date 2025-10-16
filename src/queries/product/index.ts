import "@/models/reviewModel";

import { connectDB } from "@/libs/connectDB";
import { Product } from "@/models/productModel";
import { IProductBase, IProductFrontend } from "@/types";
import { transformMongoDoc } from "@/utils/transformMongoDoc";

// Create a product
export const createProduct = async (payload: Omit<IProductBase, "id">) => {
  await connectDB();
  const createdProduct = await Product.create(payload);
  return createdProduct;
};

// Get all product
export const getProducts = async (searchParams: {
  term?: string;
  category?: string;
  priceRange?: string;
  location?: string;
  organic?: string;
  sort?: string;
  page?: string;
  limit?: string;
}) => {
  await connectDB();

  const {
    term,
    category,
    priceRange,
    location,
    organic,
    sort,
    page = "1",
    limit = "6",
  } = searchParams;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = { isActive: true };

  // search term based on name or description
  if (term) {
    filter.$or = [
      { name: { $regex: term, $options: "i" } },
      { description: { $regex: term, $options: "i" } },
    ];
  }

  // category filter
  if (category) {
    const categories = decodeURI(category).split("|");
    filter.category =
      categories.length === 1 ? categories[0] : { $in: categories };
  }

  // price range filter
  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    if (!isNaN(min) && !isNaN(max)) {
      filter.price = { $gte: min, $lte: max };
    }
  }

  // organic filter
  if (organic === "true") {
    filter.features = { $in: ["Organic"] };
  }

  // sorting
  let sortOptions: Record<string, 1 | -1> = {};

  switch (sort) {
    case "price_low_to_high":
      sortOptions = { price: 1 };
      break;
    case "price_high_to_low":
      sortOptions = { price: -1 };
      break;
    case "newest":
      sortOptions = { createdAt: -1 };
      break;
    case "rating":
      sortOptions = { rating: -1 };
      break;
    default:
      sortOptions = { createdAt: -1 };
  }

  // pagination
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 1, 1);
  const skip = (pageNum - 1) * limitNum;

  // query plus count docs
  const [products, totalProducts] = await Promise.all([
    Product.find(filter)
      .populate("farmer")
      .populate("reviews")
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean<IProductFrontend[]>(),
    Product.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalProducts / limitNum);

  let filteredProducts = products;

  if (location) {
    filteredProducts = products.filter((product) =>
      product?.farmer?.farmDistrict
        ?.toLowerCase()
        ?.includes(location.toLowerCase())
    );
  }

  return {
    products: transformMongoDoc(filteredProducts),
    pagination: {
      totalProducts,
      totalPages,
      currentPage: pageNum,
      limit: limitNum,
    },
  };
};

// Get products by farmerId
export const getProductsByFarmerId = async (farmerId: string) => {
  await connectDB();

  const products = await Product.find({ farmer: farmerId })
    .populate("farmer")
    .populate("reviews")
    .lean<IProductFrontend[]>();

  return transformMongoDoc(products);
};

// Get product by its id
export const getProduct = async (productId: string) => {
  await connectDB();

  const product = await Product.findById(productId)
    .populate("farmer")
    .populate({
      path: "reviews",
      model: "Review",
      populate: {
        path: "customer",
        model: "User",
      },
    })
    .lean<IProductFrontend>();
  return transformMongoDoc(product);
};
