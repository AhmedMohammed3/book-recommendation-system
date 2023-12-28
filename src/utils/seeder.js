const mongoose = require('mongoose');
const User = require('../models/User');
const Book = require('../models/Book');
const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME
} = require('./config');

const seedDatabase = async () => {
    await seedUsers();
    await seedBooks();

    console.log('Database seeded successfully');
    process.exit();
};

const seedBooks = async () => {
    await Book.deleteMany({});
    const books = [{
            book_id: '1',
            book_name: 'Harry Potter'
        },
        {
            book_id: '2',
            book_name: 'Clean Code'
        },
        {
            book_id: '3',
            book_name: 'Book 3'
        },
        {
            book_id: '4',
            book_name: 'Book 4'
        },
        {
            book_id: '5',
            book_name: 'Book 5'
        },
        {
            book_id: '6',
            book_name: 'Book 6'
        },
        {
            book_id: '7',
            book_name: 'Book 7'
        },
        {
            book_id: '8',
            book_name: 'Book 8'
        },
        {
            book_id: '9',
            book_name: 'Book 9'
        },
        {
            book_id: '10',
            book_name: 'Book 10'
        },
    ];
    return await Book.create(books);
}

const seedUsers = async () => {
    await User.deleteMany({});
    const users = [{
            user_id: '111',
            username: 'user1'
        },
        {
            user_id: '222',
            username: 'user2'
        },
        {
            user_id: '333',
            username: 'user3'
        },
        {
            user_id: '444',
            username: 'user4'
        },
        {
            user_id: '555',
            username: 'user5'
        },
        {
            user_id: '666',
            username: 'user6'
        },
        {
            user_id: '777',
            username: 'user7'
        },
        {
            user_id: '888',
            username: 'user8'
        },
    ];
    return await User.create(users);
}

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        seedDatabase();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });