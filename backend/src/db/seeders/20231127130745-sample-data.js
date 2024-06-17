const db = require('../models');
const Users = db.users;

const BrandStyles = db.brand_styles;

const Categories = db.categories;

const CategoryQuestions = db.category_questions;

const ColorCodes = db.color_codes;

const Customers = db.customers;

const Industries = db.industries;

const Orders = db.orders;

const Packages = db.packages;

const Payments = db.payments;

const Products = db.products;

const Tickets = db.tickets;

const BrandStylesData = [
  {
    name: 'Modern',

    description: 'Modern style',
  },

  {
    name: 'Classic',

    description: 'Classic style',
  },

  {
    name: 'Vintage',

    description: 'Vintage style',
  },
];

const CategoriesData = [
  {
    name: 'Electronics',

    is_active: true,
  },

  {
    name: 'Clothing',

    is_active: true,
  },

  {
    name: 'Books',

    is_active: true,
  },
];

const CategoryQuestionsData = [
  {
    // type code here for "relation_one" field

    text: 'What is the warranty period?',

    type: 'Choice-based',

    options: '',

    is_mandatory: true,
  },

  {
    // type code here for "relation_one" field

    text: 'What sizes are available?',

    type: 'SimpleText',

    options: 'S,M,L,XL',

    is_mandatory: true,
  },

  {
    // type code here for "relation_one" field

    text: 'Is this book available in hardcover?',

    type: 'SimpleText',

    options: '',

    is_mandatory: true,
  },
];

const ColorCodesData = [
  {
    name: 'Red',

    code: '#FF0000',

    description: 'Bright red color',
  },

  {
    name: 'Blue',

    code: '#0000FF',

    description: 'Bright blue color',
  },

  {
    name: 'Green',

    code: '#00FF00',

    description: 'Bright green color',
  },
];

const CustomersData = [
  {
    first_name: 'Emily',

    last_name: 'Clark',

    email: 'emily.clark@example.com',

    phone_number: '5551234567',

    address: '123 Main St, Anytown, USA',

    // type code here for "images" field

    state: 'CA',

    country: 'USA',

    city: 'Los Angeles',

    password: 'password123',

    is_verified: true,
  },

  {
    first_name: 'Michael',

    last_name: 'Wilson',

    email: 'michael.wilson@example.com',

    phone_number: '5559876543',

    address: '456 Elm St, Othertown, USA',

    // type code here for "images" field

    state: 'NY',

    country: 'USA',

    city: 'New York',

    password: 'password123',

    is_verified: true,
  },

  {
    first_name: 'Sarah',

    last_name: 'Taylor',

    email: 'sarah.taylor@example.com',

    phone_number: '5556543210',

    address: '789 Oak St, Sometown, USA',

    // type code here for "images" field

    state: 'TX',

    country: 'USA',

    city: 'Houston',

    password: 'password123',

    is_verified: true,
  },
];

const IndustriesData = [
  {
    name: 'Technology',

    description: 'Tech industry',
  },

  {
    name: 'Fashion',

    description: 'Fashion industry',
  },

  {
    name: 'Publishing',

    description: 'Publishing industry',
  },
];

const OrdersData = [
  {
    order_date: new Date('2023-10-01T10:00:00Z'),

    total_price: 99.99,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    answers: 'Warranty: 1 year',

    status: 'processing',
  },

  {
    order_date: new Date('2023-10-02T11:00:00Z'),

    total_price: 49.99,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    answers: 'Size: M',

    status: 'pending',
  },

  {
    order_date: new Date('2023-10-03T12:00:00Z'),

    total_price: 29.99,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_many" field

    // type code here for "relation_many" field

    // type code here for "relation_one" field

    answers: 'Hardcover: Yes',

    status: 'processing',
  },
];

const PackagesData = [
  {
    name: 'Basic Package',

    description: 'Basic package description',

    price: 9.99,

    discount: 0,
  },

  {
    name: 'Standard Package',

    description: 'Standard package description',

    price: 19.99,

    discount: 5,
  },

  {
    name: 'Premium Package',

    description: 'Premium package description',

    price: 29.99,

    discount: 10,
  },
];

const PaymentsData = [
  {
    payment_date: new Date('2023-10-01T10:00:00Z'),

    amount: 99.99,

    // type code here for "relation_one" field

    payment_method: 'Credit Card',

    status: 'completed',
  },

  {
    payment_date: new Date('2023-10-02T11:00:00Z'),

    amount: 49.99,

    // type code here for "relation_one" field

    payment_method: 'PayPal',

    status: 'completed',
  },

  {
    payment_date: new Date('2023-10-03T12:00:00Z'),

    amount: 29.99,

    // type code here for "relation_one" field

    payment_method: 'Credit Card',

    status: 'pending',
  },
];

const ProductsData = [
  {
    name: 'Smartphone',

    description: 'Latest model smartphone',

    price: 699.99,

    // type code here for "relation_one" field

    stock: 50,

    // type code here for "images" field

    type: 'Electronics',
  },

  {
    name: 'T-Shirt',

    description: 'Comfortable cotton t-shirt',

    price: 19.99,

    // type code here for "relation_one" field

    stock: 200,

    // type code here for "images" field

    type: 'Clothing',
  },

  {
    name: 'Cookbook',

    description: 'Delicious recipes for home cooking',

    price: 29.99,

    // type code here for "relation_one" field

    stock: 100,

    // type code here for "images" field

    type: 'Books',
  },
];

const TicketsData = [
  {
    title: 'Order not received',

    status: 'open',

    creation_date: new Date('2023-10-01T10:00:00Z'),

    last_update_date: new Date('2023-10-01T12:00:00Z'),

    details: 'I have not received my order yet.',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: 'Product damaged',

    status: 'closed',

    creation_date: new Date('2023-10-02T11:00:00Z'),

    last_update_date: new Date('2023-10-02T13:00:00Z'),

    details: 'The product I received is damaged.',

    // type code here for "files" field

    // type code here for "relation_one" field
  },

  {
    title: 'Wrong item delivered',

    status: 'open',

    creation_date: new Date('2023-10-03T12:00:00Z'),

    last_update_date: new Date('2023-10-03T14:00:00Z'),

    details: 'I received the wrong item.',

    // type code here for "files" field

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

async function associateCategoryQuestionWithCategory() {
  const relatedCategory0 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const CategoryQuestion0 = await CategoryQuestions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (CategoryQuestion0?.setCategory) {
    await CategoryQuestion0.setCategory(relatedCategory0);
  }

  const relatedCategory1 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const CategoryQuestion1 = await CategoryQuestions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (CategoryQuestion1?.setCategory) {
    await CategoryQuestion1.setCategory(relatedCategory1);
  }

  const relatedCategory2 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const CategoryQuestion2 = await CategoryQuestions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (CategoryQuestion2?.setCategory) {
    await CategoryQuestion2.setCategory(relatedCategory2);
  }
}

async function associateOrderWithCustomer() {
  const relatedCustomer0 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setCustomer) {
    await Order0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setCustomer) {
    await Order1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setCustomer) {
    await Order2.setCustomer(relatedCustomer2);
  }
}

async function associateOrderWithIndustry() {
  const relatedIndustry0 = await Industries.findOne({
    offset: Math.floor(Math.random() * (await Industries.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setIndustry) {
    await Order0.setIndustry(relatedIndustry0);
  }

  const relatedIndustry1 = await Industries.findOne({
    offset: Math.floor(Math.random() * (await Industries.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setIndustry) {
    await Order1.setIndustry(relatedIndustry1);
  }

  const relatedIndustry2 = await Industries.findOne({
    offset: Math.floor(Math.random() * (await Industries.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setIndustry) {
    await Order2.setIndustry(relatedIndustry2);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateOrderWithBrand_style() {
  const relatedBrand_style0 = await BrandStyles.findOne({
    offset: Math.floor(Math.random() * (await BrandStyles.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setBrand_style) {
    await Order0.setBrand_style(relatedBrand_style0);
  }

  const relatedBrand_style1 = await BrandStyles.findOne({
    offset: Math.floor(Math.random() * (await BrandStyles.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setBrand_style) {
    await Order1.setBrand_style(relatedBrand_style1);
  }

  const relatedBrand_style2 = await BrandStyles.findOne({
    offset: Math.floor(Math.random() * (await BrandStyles.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setBrand_style) {
    await Order2.setBrand_style(relatedBrand_style2);
  }
}

async function associatePaymentWithCustomer() {
  const relatedCustomer0 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Payment0 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Payment0?.setCustomer) {
    await Payment0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Payment1 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Payment1?.setCustomer) {
    await Payment1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Payment2 = await Payments.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Payment2?.setCustomer) {
    await Payment2.setCustomer(relatedCustomer2);
  }
}

async function associateProductWithCategory() {
  const relatedCategory0 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const Product0 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Product0?.setCategory) {
    await Product0.setCategory(relatedCategory0);
  }

  const relatedCategory1 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const Product1 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Product1?.setCategory) {
    await Product1.setCategory(relatedCategory1);
  }

  const relatedCategory2 = await Categories.findOne({
    offset: Math.floor(Math.random() * (await Categories.count())),
  });
  const Product2 = await Products.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Product2?.setCategory) {
    await Product2.setCategory(relatedCategory2);
  }
}

async function associateTicketWithCustomer() {
  const relatedCustomer0 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Ticket0 = await Tickets.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Ticket0?.setCustomer) {
    await Ticket0.setCustomer(relatedCustomer0);
  }

  const relatedCustomer1 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Ticket1 = await Tickets.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Ticket1?.setCustomer) {
    await Ticket1.setCustomer(relatedCustomer1);
  }

  const relatedCustomer2 = await Customers.findOne({
    offset: Math.floor(Math.random() * (await Customers.count())),
  });
  const Ticket2 = await Tickets.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Ticket2?.setCustomer) {
    await Ticket2.setCustomer(relatedCustomer2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await BrandStyles.bulkCreate(BrandStylesData);

    await Categories.bulkCreate(CategoriesData);

    await CategoryQuestions.bulkCreate(CategoryQuestionsData);

    await ColorCodes.bulkCreate(ColorCodesData);

    await Customers.bulkCreate(CustomersData);

    await Industries.bulkCreate(IndustriesData);

    await Orders.bulkCreate(OrdersData);

    await Packages.bulkCreate(PackagesData);

    await Payments.bulkCreate(PaymentsData);

    await Products.bulkCreate(ProductsData);

    await Tickets.bulkCreate(TicketsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateCategoryQuestionWithCategory(),

      await associateOrderWithCustomer(),

      await associateOrderWithIndustry(),

      // Similar logic for "relation_many"

      // Similar logic for "relation_many"

      await associateOrderWithBrand_style(),

      await associatePaymentWithCustomer(),

      await associateProductWithCategory(),

      await associateTicketWithCustomer(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('brand_styles', null, {});

    await queryInterface.bulkDelete('categories', null, {});

    await queryInterface.bulkDelete('category_questions', null, {});

    await queryInterface.bulkDelete('color_codes', null, {});

    await queryInterface.bulkDelete('customers', null, {});

    await queryInterface.bulkDelete('industries', null, {});

    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('packages', null, {});

    await queryInterface.bulkDelete('payments', null, {});

    await queryInterface.bulkDelete('products', null, {});

    await queryInterface.bulkDelete('tickets', null, {});
  },
};
