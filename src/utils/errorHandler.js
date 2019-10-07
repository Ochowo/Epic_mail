export const errorHandler = (err) => {
  const error = {};
  if (err.response) {
    if (err.response.status === 400) {
      error.response = err.response.data;
    } else if (err.response.status === 409) {
      error.response = 'The email already exist';
    } else if (err.response.status === 401 || err.response.status === 403) {
      error.response = err.response.data.errors;
    } else if (err.response.status === 500) {
      error.response = 'Something happened, please check your connection and try again';
    } else {
      error.response = err.response.statusText;
    }
  }

  return error;
};

export default errorHandler;
