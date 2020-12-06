import isEmpty from '../validation/isEmpty';

const regex = /^[a-z0-9][a-z0-9-_]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
const validate = (data) => {
  const errors = {};
  if (isEmpty(data.email)) {
    errors.email = 'Email field is empty';
  } else if (!regex.test(data.email)) {
    errors.email = 'You have entered an invalid email';
  }
  if (isEmpty(data.email)) {
    errors.password = 'Password is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validate;
