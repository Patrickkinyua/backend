# MERN E-Commerce Backend Service Documentation

## Overview

This is the backend service for a MERN (MongoDB, Express, React, Node.js) e-commerce application. It provides a RESTful API for managing products with full CRUD (Create, Read, Update, Delete) operations.

**Server Base URL:** `http://localhost:5000`

---

## Project Structure

```
backend/
├── server.js                 # Main application entry point
├── config/
│   └── db.connect.js        # MongoDB connection configuration
├── models/
│   └── product.model.js     # Product data schema
├── routers/
│   └── products.router.js   # Product API endpoints
├── .env                     # Environment variables (not committed)
└── .git/                    # Git repository
```

---

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ORM/ODM:** Mongoose
- **Environment Management:** dotenv
- **Module Type:** ES Modules (import/export)

---

## Configuration

### Environment Variables (.env)

The application uses a `.env` file to store sensitive configuration:



**Variables:**
- `MONGO_URI` - MongoDB connection string for database access

---

## Core Modules

### 1. Server Entry Point [server.js](server.js)

**Purpose:** Initializes and runs the Express application.

**Key Features:**
- Loads environment variables via `dotenv`
- Creates Express app instance
- Configures middleware for JSON parsing
- Registers product routes
- Starts server on port 5000
- Establishes database connection on startup

**Server Startup:**
```javascript
app.listen(5000, () => {
  console.log('Server is running on port http://localhost:5000');
  connectDB();
});
```

---

### 2. Database Connection [config/db.connect.js](config/db.connect.js)

**Purpose:** Handles MongoDB connection establishment.

**Key Features:**
- Loads environment variables from `.env` file
- Establishes async connection to MongoDB via Mongoose
- Provides error handling and logging
- Exits process on connection failure

**Connection Process:**
```javascript
const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
```

---

### 3. Product Model [models/product.model.js](models/product.model.js)

**Purpose:** Defines the Product schema and model for MongoDB.

**Schema Definition:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✓ Yes | Product name |
| `price` | Number | ✓ Yes | Product price |
| `image` | String | ✓ Yes | Product image URL |
| `timestamp` | Date | ✗ No | Creation timestamp (auto-generated) |

**Model Creation:**
```javascript
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
```

---

### 4. Products Router [routers/products.router.js](routers/products.router.js)

**Purpose:** Defines all product-related API endpoints.

**Base Path:** `/products`

#### API Endpoints

---

##### **POST /products**
**Description:** Create a new product

**Request Body:**
```json
{
  "name": "Product Name",
  "price": 29.99,
  "image": "https://example.com/image.jpg"
}
```

**Validation:**
- All fields (`name`, `price`, `image`) are required
- Returns 400 Bad Request if any field is missing

**Success Response:**
- **Status:** 201 Created
- **Body:** Created product object with MongoDB `_id` and `timestamp`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Product Name",
  "price": 29.99,
  "image": "https://example.com/image.jpg",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

**Error Response:**
- **Status:** 500 Internal Server Error
- **Body:** `{ "message": "Server Error" }`

---

##### **GET /products**
**Description:** Retrieve all products from the database

**Request Parameters:** None

**Success Response:**
- **Status:** 200 OK
- **Body:** Array of product objects

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Product 1",
    "price": 29.99,
    "image": "https://example.com/image1.jpg",
    "timestamp": "2026-01-15T10:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Product 2",
    "price": 49.99,
    "image": "https://example.com/image2.jpg",
    "timestamp": "2026-01-15T10:35:00.000Z"
  }
]
```

**Error Response:**
- **Status:** 500 Internal Server Error
- **Body:** `{ "message": "Server Error" }`

---

##### **PUT /products/:id**
**Description:** Update an existing product by ID

**URL Parameters:**
- `id` - MongoDB product ID (required)

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 39.99,
  "image": "https://example.com/updated-image.jpg"
}
```

**Success Response:**
- **Status:** 200 OK
- **Body:** Updated product object

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Updated Product Name",
  "price": 39.99,
  "image": "https://example.com/updated-image.jpg",
  "timestamp": "2026-01-15T10:30:00.000Z"
}
```

**Error Response:**
- **Status:** 500 Internal Server Error
- **Body:** `{ "message": "Server Error" }`

---

##### **DELETE /products/:id**
**Description:** Delete a product by ID

**URL Parameters:**
- `id` - MongoDB product ID (required)

**Success Response:**
- **Status:** 200 OK
- **Body:** `{ "message": "Product deleted successfully" }`

**Error Response:**
- **Status:** 500 Internal Server Error
- **Body:** `{ "message": "Server Error" }`

---

## Middleware

The application uses the following middleware:

1. **express.json()** - Parses incoming JSON request bodies and makes them available in `req.body`

---

## HTTP Status Codes

| Status Code | Meaning | Usage |
|-------------|---------|-------|
| 200 | OK | Successful GET, PUT, DELETE operations |
| 201 | Created | Successful POST operation |
| 400 | Bad Request | Missing required fields in POST request |
| 500 | Internal Server Error | Database or server errors |

---

## Error Handling

The application implements basic error handling:

- **Validation Errors:** Returns 400 Bad Request for missing fields in POST requests
- **Database Errors:** Returns 500 Internal Server Error for database operation failures
- **Connection Errors:** Logs errors and exits the process if database connection fails

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB URI:
```
MONGO_URI="your_mongodb_connection_string"
```

### Running the Server

Start the server:
```bash
npm start
```

The server will start on `http://localhost:5000` and establish a MongoDB connection.

---

## Dependencies

Expected dependencies in `package.json`:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management

---

## API Usage Examples

### Create a Product
```bash
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "image": "https://example.com/laptop.jpg"
  }'
```

### Get All Products
```bash
curl http://localhost:5000/products
```

### Update a Product
```bash
curl -X PUT http://localhost:5000/products/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "price": 1099.99,
    "image": "https://example.com/updated-laptop.jpg"
  }'
```

### Delete a Product
```bash
curl -X DELETE http://localhost:5000/products/507f1f77bcf86cd799439011
```

---

## Future Enhancements

- Add authentication and authorization (JWT)
- Implement pagination and filtering for product listing
- Add product categories and tags
- Implement review and rating system
- Add order management endpoints
- Input validation middleware
- API documentation with Swagger/OpenAPI
- Unit and integration testing
- Rate limiting and security headers
- Logging system

---

## License

Part of MERN E-Commerce Application
