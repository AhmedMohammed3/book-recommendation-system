# Book Recommendation System

## Description

### Problem Overview

You love reading and want to inspire others to enjoy it too. 

Solving this problem, We're creating a system that does two main things:

1. **Submit Reading API**: Users can tell the system the pages they read in a book. They can do this multiple times for the same book.
   **Example Request:**

    ```json
    {
        "user_id": "111",
        "book_id": "1",
        "start_page": 2,
        "end_page": 12
    }
    ```

2. **Top 5 Recommended Books API:** The system figures out and tells everyone the top five books based on how many unique pages people have read.
   **Example Response:**

    ```json
    [
        {
            "book_id": "5",
            "book_name": "Clean Code",
            "num_of_read_pages": 100
        },
        {
            "book_id": "1",
            "book_name": "Harry Potter",
            "num_of_read_pages": 90
        },
        {
            "book_id": "10",
            "book_name": "The Kite Runner",
            "num_of_read_pages": 20
        }
    ]
    ```

### System Requirements

**Submit Reading API:**

1. Users share the pages they read in a book.
2. Multiple shares are allowed for the same book.

**Top 5 Recommended Books API:**

1. Recommends the top five books based on the total pages read by everyone.
2. The list is from most to least read pages.

**Thank You SMS:**

1. Sends a "Thank You" SMS to the user after they share their reading.

### SMS Providers

For SMS, there are two options:

1. [SMS Provider 1](https://run.mocky.io/v3/8eb88272-d769-417c-8c5c-159bb023ec0a)
2. [SMS Provider 2](https://run.mocky.io/v3/268d1ff4-f710-4aad-b455-a401966af719)

## Table of Contents

- [Book Recommendation System](#book-recommendation-system)
  - [Description](#description)
    - [Problem Overview](#problem-overview)
    - [System Requirements](#system-requirements)
    - [SMS Providers](#sms-providers)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Seeding the database](#seeding-the-database)
    - [Running Tests](#running-tests)
  - [API Documentation](#api-documentation)
  - [Running the Server](#running-the-server)
  - [Contributing](#contributing)

## Features

- Submit reading intervals for users and books.
- Get book recommendations based on reading statistics.

## Getting Started

### Prerequisites

Make sure you have the following software installed:

- [Node.js V20.10](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AhmedMohammed3/book-recommendation-system.git
```

2. Install dependencies:

```bash
 cd book-recommendation-system
 npm install
```

### Configuration

Update the configurations in the .env file or set environment variables as needed.

```env
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=your_db_host
DB_NAME=your_db_name
PORT=your_server_port
USING_SMS_PROVIDER=the_required_sms_provider
SMS_PROVIDER_URL_1=sms_provider_1_url
SMS_PROVIDER_URL_2=sms_provider_2_url
```

### Seeding the database

To seed the database with initial data, run the following command:

```bash
npm run seed
```

### Running Tests

To run tests, execute the following command:

```bash
npm test
```

This command will use Mocha to run tests located in the ./test directory. Chai is used for assertions, and Sinon is used for spies, stubs, and mocks.

## API Documentation

The API documentation is available using Swagger UI.

Visit [http://localhost:your_server_port/api-docs](http://localhost:your_server_port/api-docs) to explore the API endpoints.

## Running the Server

Start the server using the following command:

```bash
npm start
```

The server will run at [http://localhost:your_server_port](http://localhost:your_server_port)

## Contributing

1. Open your terminal and clone the repository
   ```bash
   git clone https://github.com/AhmedMohammed3/book-recommendation-system.git
   ```
2. Create your branch
   ```bash
   git checkout -b {YOUR_BRANCH_NAME}
   ```
3. run `npm run seed` for seeding the database
4. run `npm run dev` to start the development server (It's automatically building and restarting).
5. Make your edits and review it well.
6. Commit your changes with appropriate message. Follow [these git style guides](https://udacity.github.io/git-styleguide/)
   ```bash
   git commit -m {YOUR_COMMIT_MSG}
   ```
7. Push your changes
   ```bash
   git push origin {YOUR_BRANCH_NAME}
   ```
8. Create a pull request
