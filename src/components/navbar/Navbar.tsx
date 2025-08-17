import Logo from "../common/Logo";
import ThemeToggler from "./ThemeToggler";
import UserMenu from "./UserMenu";

const Navbar = async () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* <!-- Desktop Navigation --> */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 font-medium"
            >
              Home
            </a>
            <a
              href="products.html"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            >
              Products
            </a>
            <a
              href="farmers.html"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            >
              Farmers
            </a>
            <a
              href="about.html"
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition"
            >
              About
            </a>
          </div>

          {/* <!-- User Actions --> */}
          <div className="flex items-center space-x-4">
            {/* <!-- Search --> */}
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>

            {/* <!-- Cart --> */}
            <button className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* <!-- User Menu --> */}
            <UserMenu />

            <ThemeToggler />

            {/* <!-- Mobile Menu Button --> */}
            <button className="md:hidden p-2 text-gray-700 dark:text-gray-300">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
