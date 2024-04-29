
# E-Commerce Admin Dashboard - Shopper

This is an e-commerce admin dashboard built with React and React Router. It provides administrative functionalities such as adding products, listing all products, and removing products. It features a Sidebar for navigation, a Navbar, and various pages for managing the product catalog.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
  - [Building for Production](#building-for-production)
- [Contributing](#contributing)

## Features

- **Add Products**: Admins can add new products with details such as title, price, offer price, category, and image.
- **List Products**: Admins can view all products in the catalog and delete unwanted products.
- **Sidebar Navigation**: Easy navigation through different sections of the admin dashboard.
- **Navbar**: A simple navigation bar with branding and user profile.

## Technologies Used

- React
- React Router
- CSS
- JavaScript Fetch API for HTTP requests
- MongoDB 

## Project Structure

- **App.js**: Main component that renders the Navbar, Sidebar, and Admin component.
- **Admin.jsx**: Parent component for the admin dashboard, with routing to various admin pages.
- **AddProduct.jsx**: Component for adding new products to the catalog.
- **ListProduct.jsx**: Component for listing all products and removing them.
- **Sidebar.jsx**: Component for sidebar navigation.
- **Navbar.jsx**: Component for the top navigation bar.
- **assets/**: Contains images and icons used across the project.
- **baseURL**: The base URL for API endpoints.
  
## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- Node.js and npm/yarn
- Visual Studio Code

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/e-commerce-admin.git
   cd e-commerce-admin
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the App

To start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your web browser. The app will automatically reload if you make changes to the code.

### Building for Production

To build the app for production:

```bash
npm run build
```

The build output will be in the `build/` directory. This can be deployed to a static hosting service or a backend server.

## Contributing

Contributions are welcome! To contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes or feature.
3. Commit your changes and push to your branch.
4. Submit a pull request with a description of what you've changed.

## Acknowledgements

Thank you for exploring this project! If you have any questions or suggestions, feel free to reach out or create an issue.

