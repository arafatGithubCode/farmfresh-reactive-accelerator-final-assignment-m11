import { Types } from "mongoose";

export const replaceMongoIdInObj = <T extends { _id: Types.ObjectId }>(
  obj: T
) => {
  const { _id, ...rest } = obj;
  return { ...rest, id: _id.toString() };
};
