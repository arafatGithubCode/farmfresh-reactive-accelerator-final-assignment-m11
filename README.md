# FarmFresh – Final Assignment of Reactive Accelerator (React/Next.js) Course (rnext-batch-3)

## Introduction

**FarmFresh** is a web platform that connects farmers directly to customers, allowing them to sell their fresh farm products without any middlemen. It ensures transparency, fairness, and freshness for both farmers and consumers.

## UI/UX

The design of FarmFresh focuses on a farming-themed aesthetic combined with an e-commerce experience.

- The interface uses soothing green tones to reflect the freshness of agriculture.
- Both light and dark themes are included for accessibility.
- Every UI element clearly communicates its purpose, ensuring a smooth and intuitive user journey.
- Each process in the app is well-connected for a seamless experience.

## Features

### Authentication

- Complete authentication flow with **Email** and **Google** credentials.
  - Login and Register using Email/Password or Google.
  - Password reset system with email confirmation.
  - Middleware-protected routes.
  - Refresh and Access Token setup for secure sessions.

### Farmer Features

- **Product Management**
  - Add products with title, description, images, discount, price, and more.
  - Update, edit, or delete existing products.
  - Activate/deactivate listed products easily.
  - Advanced filters and pagination for quick navigation.
- **Order Management**
  - View and track all product orders from the “My Orders” page.
  - Update order status (Placed → Confirmed → Shipped → Delivered).
  - Smart filters for quick order search.
- **Profile Management**
  - Edit profile details, including role and personal info.

### Customer Features

- **Cart Management**
  - Add, increment, decrement, and delete products from the cart.
  - Smart cart page to manage products and navigate to checkout.
  - Simulated payment process for order placement.
  - Orders can be canceled before farmer confirmation; canceled orders can be replaced.
  - Downloadable order receipt as a professional PDF including farmer and order details.

### Filtering and Searching

- Case-insensitive search for products by title and description.
- Filter products by price, category, features, and location.
- Sort products for better browsing experience.

### Review System

- Customers can review a product only once.
- Reviews are allowed only after the product is successfully delivered.

### Email Configuration

- Order confirmation emails.
- Order status update notifications.
- Password reset key emails.

### UI Navigation

The **Navbar** is common across all pages but adapts based on user login status.

- **If not logged in:** Show **Login** and **Signup** buttons.
- **If logged in as a Farmer:** Show menu items: `Home`, `Add Product`, `Manage Products`, `About`, `Logout`.
- **If logged in as a Customer:** Show menu items: `Home`, `Products`, `Farmers`, `My Orders`, `About`, `Logout`.

**Page Access and Functionality:**

- Only farmer-type users can access the **Add Product** page to create new products.
- Farmers can manage their products using the **Manage Products** page — edit, publish/unpublish, delete, search, or filter items.
- All users (including guests) can view registered farmers on the **Farmers** page.
- The **Cart** menu redirects users to the Cart Page (which must be designed following the app’s theme and design system).
- A **Favorite Products** page should allow users to favorite/unfavorite products, purchase, or add them to the cart.
- Proper handling of states such as **Loading**, **Error**, and **Not Found** is implemented.
- **SEO-Friendly Pages:**  
  The Home and Product Details pages include meta title, description, and image for social sharing (e.g., Facebook).  
  Product details dynamically generate SEO metadata based on the product link.
- A smooth **Breadcrumb Navigation** is implemented throughout the app.

## Tech Stack

- **Next.js 14 (with TypeScript):** Framework for building server-side rendered React applications.
- **Yarn:** Dependency manager for fast and reliable installations.
- **File-based Routing (Pages & API):** Automatic route generation for pages and API endpoints.
- **Server Actions:** Simplifies server-side data mutation.
- **React Icons:** Ready-to-use icons as React components.
- **React Toastify:** Provides toast notifications for user feedback.
- **Nodemailer (SMTP):** Handles email sending securely.
- **ESLint:** Ensures consistent code quality and formatting.
- **React PDF:** Generates PDF documents from React components.
- **Next Themes:** Enables dark and light theme toggling.
- **Next Auth:** Provides authentication using email, credentials, or Google.
- **bcryptjs:** Secure password hashing library.
- **Cloudinary:** Cloud-based image storage and optimization.

## How to Clone and Run the Project

Follow these steps to get started:

```bash
# 1. Copy one of the following repository URLs:

# HTTPS
https://github.com/arafatGithubCode/farmfresh-reactive-accelerator-final-assignment-m11.git

# SSH
git@github.com:arafatGithubCode/farmfresh-reactive-accelerator-final-assignment-m11.git


# 2. Clone the repository
git clone <your-selected-url>

# 3. Navigate to the project directory
cd farmfresh-reactive-accelerator-final-assignment-m11

# 4. Install dependencies
yarn

# 5. Start the development server
yarn run dev
```

© 2025 Arafat Hossain – All Rights Reserved.
