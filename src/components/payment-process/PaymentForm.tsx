const PaymentForm = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Payment Information
      </h2>

      <form className="space-y-6" action="success.html" method="POST">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Payment Method
          </label>
          <div className="space-y-3">
            <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                className="text-primary-600 focus:ring-primary-500"
                checked
              />
              <div className="ml-3 flex items-center">
                <i className="fas fa-credit-card text-lg mr-2"></i>
                <span className="font-medium">Credit/Debit Card</span>
              </div>
            </label>
            <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="bkash"
                className="text-primary-600 focus:ring-primary-500"
              />
              <div className="ml-3 flex items-center">
                <i className="fas fa-mobile-alt text-lg mr-2"></i>
                <span className="font-medium">bKash</span>
              </div>
            </label>
            <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="nagad"
                className="text-primary-600 focus:ring-primary-500"
              />
              <div className="ml-3 flex items-center">
                <i className="fas fa-wallet text-lg mr-2"></i>
                <span className="font-medium">Nagad</span>
              </div>
            </label>
          </div>
        </div>

        <div id="cardDetails" className="space-y-4">
          <div>
            <label
              htmlFor="cardName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiry"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                maxLength={4}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="123"
              />
            </div>
          </div>
        </div>

        <div id="mobileDetails" className="hidden space-y-4">
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="+880 1234 567890"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              checked
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              Same as delivery address
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium text-lg transition duration-200 transform hover:scale-105"
        >
          <i className="fas fa-lock mr-2"></i>
          Complete Payment - ৳300
        </button>

        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <i className="fas fa-shield-alt mr-2"></i>
          Your payment information is secure and encrypted
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
