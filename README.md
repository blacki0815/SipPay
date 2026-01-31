# SipPay

## Description

**SipPay** is a simple payment and deposit management system developed for a fictional children's play town.
Its goal is to help children learn about work, money, payments, and deposits (*Pfand*) in a playful and practical way.

The system consists of a lightweight web frontend and a Node.js backend that stores data in JSON files.



## Features

- 💳 Simple payment handling (orders)
- 📦 Deposit return tracking (*Pfand-Rückgaben*)
- 🧾 Admin and bar interfaces via HTML pages
- 📅 Order filtering by date
- 💾 Persistent storage using JSON files
- 🌐 REST API based on Express.js



## Tech Stack

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - CORS

- **Data Storage:**
  - JSON files (`orders.json`, `pfand_rueckgaben.json`)



## Project Structure

```text
.
├── index.html            # Main entry page
├── bar.html              # Bar interface
├── admin.html            # Admin interface
├── pfand.html            # Deposit return interface
├── style.css             # Global styles
├── script.js              # Frontend logic
├── fontsize.js           # UI helper
├── server.js             # Express backend
├── orders.json            # Orders database
├── pfand_rueckgaben.json  # Deposit returns database
├── package.json
├── package-lock.json
└── ServerStart.txt
````



## Getting Started

### Prerequisites

* Node.js (v16 or newer recommended)
* npm



### Installation

Install dependencies:

```bash
npm install
```



### Start Server

Run the backend server:

```bash
node server.js
```

The server will start at:

```text
http://localhost:8080
```

Static frontend files are served automatically.



## API Endpoints

### Orders

#### Get all orders

Optional query parameter: `date=YYYY-MM-DD`

```http
GET /orders
GET /orders?date=2026-01-01
```

#### Create new order

```http
POST /orders
```

#### Update order

```http
PUT /orders/:id
```

#### Delete all orders

```http
DELETE /orders
```



### Deposit Returns (*Pfand-Rückgaben*)

#### Get all deposit returns

```http
GET /pfand_rueckgaben
```

#### Create deposit return entry

```http
POST /pfand_rueckgaben
```

#### Delete all deposit returns

```http
DELETE /pfand_rueckgaben
```



## Data Storage

All data is stored locally in JSON files:

* `orders.json` – stores all payment transactions
* `pfand_rueckgaben.json` – stores deposit return entries

Files are created automatically on server startup if they do not exist.



## Usage Context

SipPay is designed for:

* Children's play towns
* Educational projects
* Simulated economic systems
* Offline or local network usage

It is **not intended for real financial transactions**.



## Future Improvements

* User roles and authentication
* Better UI/UX for children
* Statistics and daily reports
* Export data (CSV / PDF)
* Replace JSON storage with a database



## License
