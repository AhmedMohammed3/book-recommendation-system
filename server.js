const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./src/routes');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./src/middlewares/errorHandler');
const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
  PORT
} = require('./src/utils/config');

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// Swagger documentation options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Recommendation API',
      version: '1.0.0',
      description: 'API for managing book reading intervals and recommendations',
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/v1', router);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

module.exports = app;