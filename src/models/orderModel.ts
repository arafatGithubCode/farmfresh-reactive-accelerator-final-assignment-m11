import { IOrder, IOrderItem } from "@/types";
import mongoose, { Model, Schema } from "mongoose";
import { TPaymentMethod } from "./../types/index";

const orderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const paymentMethodSchema = new Schema<TPaymentMethod>(
  {
    method: {
      type: String,
      enum: ["card", "bkash", "nagad"],
      required: [true, "Please select payment method."],
    },
    cardDetails: {
      nameOnCard: {
        type: String,
        trim: true,
        required: function () {
          return this.method === "card";
        },
      },
      cardNumber: {
        type: String,
        trim: true,
        required: function () {
          return this.method === "card";
        },
      },
      cvv: {
        type: String,
        trim: true,
        required: function () {
          return this.method === "card";
        },
      },
      expiry: {
        type: String,
        trim: true,
        required: function () {
          return this.method === "card";
        },
      },
    },
    mobileDetails: {
      number: {
        type: String,
        trim: true,
        required: function () {
          return this.method === "bkash" || this.method === "nagad";
        },
      },
    },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [orderItemSchema],
    status: {
      type: String,
      default: "PLACED",
    },
    bookingDate: {
      type: Date,
      required: [true, "bookings date is required."],
    },
    regularDeliveryDate: {
      type: Schema.Types.Mixed,
      default: false,
    },
    sameDayDeliveryDate: {
      type: Schema.Types.Mixed,
      default: false,
    },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required."],
    },
    paymentMethod: paymentMethodSchema,
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order ?? mongoose.model("Order", orderSchema);
