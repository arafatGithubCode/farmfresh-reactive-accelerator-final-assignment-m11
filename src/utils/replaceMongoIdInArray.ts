import { IMongoProduct, IProductModel } from "@/types";

export const replaceMongoIdInArray = (
  array: IMongoProduct[]
): IProductModel[] => {
  return array.map(({ _id, ...rest }) => ({
    ...rest,
    id: _id.toString(),
  }));
};
