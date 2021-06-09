const productExistsError = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const productNameLengthError = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};

const quantityLargerThanZeroError = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};

const quantityMustBeANumberError = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const invalidIdFormatError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
};

const wrongIdOrQuantityError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const saleNotFoundError = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const saleIdFormatError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};
const stockQuantityError = {
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

module.exports = {
  productExistsError,
  productNameLengthError,
  quantityMustBeANumberError,
  quantityLargerThanZeroError,
  invalidIdFormatError,
  wrongIdOrQuantityError,
  saleNotFoundError,
  saleIdFormatError,
  stockQuantityError
};
