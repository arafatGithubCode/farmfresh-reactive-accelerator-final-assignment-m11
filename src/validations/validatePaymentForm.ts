import { TPaymentData } from "@/types";
import { maxLength, minLength, required } from ".";

export const validatePaymentForm = (paymentData: TPaymentData) => {
  const {
    deliveryAddress,
    paymentMethod: { cardDetails, method, mobileDetails },
  } = paymentData;

  // validate delivery address
  const deliveryAddressError =
    required(deliveryAddress) ??
    minLength(deliveryAddress, 10) ??
    maxLength(deliveryAddress, 100);

  // validate card method
  const cardErrors =
    method === "card"
      ? {
          nameOnCard:
            required(cardDetails.nameOnCard) ??
            minLength(cardDetails.nameOnCard, 3) ??
            maxLength(cardDetails.nameOnCard, 50),

          cardNumber:
            required(cardDetails.cardNumber) ??
            (/^\d{16}$/.test(cardDetails.cardNumber)
              ? null
              : "Card number must be 16 digits"),

          cvv:
            required(cardDetails.cvv) ??
            (/^\d{3,4}$/.test(cardDetails.cvv)
              ? null
              : "CVV must be 3 or 4 digits"),

          expiry:
            required(cardDetails.expiry) ??
            (/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)
              ? null
              : "Expiry must be in MM/YY format"),
        }
      : null;

  // validate bkash/nagad method
  const mobileErrors =
    method === "bkash" || method === "nagad"
      ? {
          number:
            required(mobileDetails.number) ??
            (/^01[3-9]\d{8}$/.test(mobileDetails.number)
              ? null
              : "Invalid mobile number format"),
        }
      : null;

  return {
    deliveryAddress: deliveryAddressError,
    paymentMethod: {
      method,
      ...(method === "card" ? cardErrors : mobileErrors),
    },
  };
};
