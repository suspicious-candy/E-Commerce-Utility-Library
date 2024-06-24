# E-Commerce-Utility-Library
This is an amazon clone with 3 pages interconnected 

The E-Commerce Utility Library is a comprehensive set of tools designed to enhance and manage various aspects of an e-commerce platform. It includes functionalities for handling shopping carts, calculating delivery dates, managing product information, and processing orders. This library is intended to streamline the development of e-commerce websites by providing pre-built, easily integrable modules.

Features
Shopping Cart Management

Add, update, and remove items from the cart.
Consolidate duplicate items within the cart.
Save the cart state to localStorage for persistence.
Delivery Date Calculation

Calculate delivery dates based on various shipping options.
Determine if a given date falls on a weekend.
Product Information Management

Maintain a list of products with details such as name, image, price, rating, and keywords.
Search functionality to filter products based on keywords.
Order Processing

Save and retrieve order details from localStorage.
Calculate total order cost, including shipping and taxes.
Manage and display past orders with details such as order date, total cost, and items.
Responsive Design

The HTML and CSS files ensure that the website is responsive and works well on various screen sizes, including phones and tablets.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/yourproject.git
Navigate to the project directory:
bash
Copy code
cd yourproject
Install dependencies:
bash
Copy code
npm install
Modules and Their Functions
Shopping Cart Management (cart.js)
Savedata: Saves the current state of the cart to localStorage.
Update Cart for Delete: Removes an item from the cart by its ID.
Update Cart for Update: Updates the quantity of an item in the cart.
Consolidate Items: Merges quantities of duplicate items in the cart.
Calculate Shipping: Computes the total shipping cost based on selected delivery options.
Calculate Amount: Calculates the total amount of the cart items.
Delivery Date Calculation (date.js)
Delivery Date: Calculates the delivery date based on a given number of days.
Is Saturday or Sunday: Checks if a given date falls on a weekend.
Delivery Date for Orders: Calculates the delivery date starting from a specific date.
Product Information Management (products.js)
Products: A list of product objects with details like ID, image, name, rating, price, and keywords.
Order Processing (OrderLists.js)
Save Function for Order: Saves the current state of orders to localStorage.
Order: Retrieves the current state of orders from localStorage.
Delivery Options (deliveryOptions.js)
Delivery Options: An array of available delivery options, each containing an ID, number of delivery days, and price in cents.
Main Scripts
amazon.js
This script initializes the product listing on the main page, handles search functionality, and manages the shopping cart.

Search Button: Filters products based on the search input.
Print: Renders the filtered product list to the HTML.
Cart to Add: Adds a product to the cart and updates the cart UI.
Toggle Opacity: Toggles the visibility of the "Added to Cart" message.
checkout.js
This script handles the checkout process, including updating item quantities, calculating totals, and managing delivery options.

Render Whole Page: Renders the entire checkout page with cart items and delivery options.
Delivery Function: Renders the delivery options for each product.
Render Order Summary: Displays the order summary with total amounts and taxes.
Update Checkout: Updates the checkout header with the current cart quantity.
orders.js
This script handles the display of past orders, showing details like order date, total amount, and individual items.

Render Items: Displays the items within each order.
Update Cart Render: Updates the cart quantity displayed in the header.
HTML Files
amazon.html
This file sets up the main page where users can browse and search for products. It includes a header with navigation links, a search bar, and a product grid.

checkout.html
This file sets up the checkout page where users can review their order, select delivery options, and see the total cost including taxes and shipping.

orders.html
This file sets up the orders page where users can view their past orders, including order date, total cost, and item details.

Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.

Inspiration and acknowledgment
The basic css and html code and the idea was porvided by -https://www.youtube.com/watch?v=EerdGm-ehJQ
