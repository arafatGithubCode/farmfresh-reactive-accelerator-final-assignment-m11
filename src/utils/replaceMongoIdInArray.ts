import { Types } from "mongoose";

export const replaceMongoIdInArray = <T extends { _id: Types.ObjectId }>(
  array: T[]
): (Omit<T, "_id"> & { id: string })[] => {
  return array.map(({ _id, ...rest }) => ({
    ...rest,
    id: _id.toString(),
  }));
};
