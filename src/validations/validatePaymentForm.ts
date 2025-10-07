import { TPaymentField, TPaymentFieldErr } from "@/types";
import { maxLength, minLength, phoneValidate, required } from ".";

export const validatePaymentForm = (
  fields: TPaymentField
): TPaymentFieldErr => {
  const {
    method,
    cardDetails: { cardNumber, cvv, expiry, nameOnCard },
    mobileDetails: { number },
    deliveryAddress,
  } = fields;

  const deliveryAddressError =
    required(deliveryAddress) ??
    minLength(deliveryAddress, 10) ??
    maxLength(deliveryAddress, 50);

  const validateCard = () => ({
    nameOnCard:
      required(nameOnCard) ??
      minLength(nameOnCard, 2) ??
      maxLength(nameOnCard, 30),

    cardNumber:
      required(cardNumber) ??
      (/^\d{16}$/.test(cardNumber) ? null : "Card number must be 16 digits"),

    cvv:
      required(cvv) ??
      (/^\d{3,4}$/.test(cvv) ? null : "CVV must be 3 or 4 digits"),

    expiry:
      required(expiry) ??
      (/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)
        ? null
        : "Expiry must be in MM/YY format"),
  });

  // Mobile wallet validation
  const validateMobile = () => ({
    number: phoneValidate(number),
  });

  switch (method) {
    case "card":
      return {
        deliveryAddress: deliveryAddressError,
        ...validateCard(),
      };

    case "bkash":
    case "nagad":
      return {
        deliveryAddress: deliveryAddressError,
        ...validateMobile(),
      };

    default:
      return {
        deliveryAddress: deliveryAddressError,
      };
  }
};
