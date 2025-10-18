import { IResetPassword } from "@/types";
import mongoose, { Model, Schema } from "mongoose";

const schema = new Schema<IResetPassword>(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    resetKey: {
      type: String,
      required: [true, "Reset key is required."],
    },
  },
  { timestamps: true }
);

export const Reset: Model<IResetPassword> =
  mongoose.models.Reset ?? mongoose.model("Reset", schema);
