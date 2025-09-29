import { getUserSession } from "@/utils/getUserSession";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import Logo from "../common/Logo";
import CartBadge from "./CartBadge";
import NavItem from "./NavItem";
import ThemeToggler from "./ThemeToggler";
import UserMenu from "./UserMenu";

const Navbar = async () => {
  const user = await getUserSession();

  return (
    <nav
      className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50"
      id="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* <!-- Desktop Navigation --> */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem link="/" label="Home" />
            {user ? (
              <>
                {user.role === "Farmer" && (
                  <>
                    <NavItem link="/add-product" label="Add Product" />
                    <NavItem link="/manage-products" label="Manage Products" />
                  </>
                )}

                {user.role !== "Farmer" && (
                  <>
                    <NavItem link="/products" label="Products" />
                    <NavItem link="/farmers" label="Farmers" />
                    <NavItem link="/my-orders" label="My Orders" />
                  </>
                )}
              </>
            ) : (
              <>
                <NavItem link="/products" label="Products" />
                <NavItem link="/farmers" label="Farmers" />
              </>
            )}
            <NavItem link="/about" label="About" />
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
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {!user || (user?.role?.toLowerCase() !== "farmer" && <CartBadge />)}
            <UserMenu />

            <ThemeToggler />

            {/* <!-- Mobile Menu Button --> */}
            <button className="md:hidden p-2 text-gray-700 dark:text-gray-300">
              <FaBars />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
