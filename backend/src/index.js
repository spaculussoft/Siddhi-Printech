const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const brand_stylesRoutes = require('./routes/brand_styles');

const categoriesRoutes = require('./routes/categories');

const category_questionsRoutes = require('./routes/category_questions');

const color_codesRoutes = require('./routes/color_codes');

const customersRoutes = require('./routes/customers');

const industriesRoutes = require('./routes/industries');

const ordersRoutes = require('./routes/orders');

const packagesRoutes = require('./routes/packages');

const paymentsRoutes = require('./routes/payments');

const productsRoutes = require('./routes/products');

const ticketsRoutes = require('./routes/tickets');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Siddhi Printech',
      description:
        'Siddhi Printech Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/brand_styles',
  passport.authenticate('jwt', { session: false }),
  brand_stylesRoutes,
);

app.use(
  '/api/categories',
  passport.authenticate('jwt', { session: false }),
  categoriesRoutes,
);

app.use(
  '/api/category_questions',
  passport.authenticate('jwt', { session: false }),
  category_questionsRoutes,
);

app.use(
  '/api/color_codes',
  passport.authenticate('jwt', { session: false }),
  color_codesRoutes,
);

app.use(
  '/api/customers',
  passport.authenticate('jwt', { session: false }),
  customersRoutes,
);

app.use(
  '/api/industries',
  passport.authenticate('jwt', { session: false }),
  industriesRoutes,
);

app.use(
  '/api/orders',
  passport.authenticate('jwt', { session: false }),
  ordersRoutes,
);

app.use(
  '/api/packages',
  passport.authenticate('jwt', { session: false }),
  packagesRoutes,
);

app.use(
  '/api/payments',
  passport.authenticate('jwt', { session: false }),
  paymentsRoutes,
);

app.use(
  '/api/products',
  passport.authenticate('jwt', { session: false }),
  productsRoutes,
);

app.use(
  '/api/tickets',
  passport.authenticate('jwt', { session: false }),
  ticketsRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
