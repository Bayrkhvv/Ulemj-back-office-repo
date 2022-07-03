import * as Sentry from '@sentry/browser';
import Vue from 'vue';

export const BAD_REQUEST_ERROR_CODE = 400;
export const VALIDATION_ERROR_CODE = 422;
export const UNAUTHORIZED_ERROR_CODE = 401;
export const NOT_FOUND_ERROR_CODE = 404;
export const ERROR_MESSAGE = 'Sorry, we are having difficulties';

export function handleValidationError(error) {
  // Some validation errors will be handled at the top. For those which don't need we will use this flag to show a toast
  // error message
  let showToast = true;

  let message = '';
  const { responseURL } = error?.request;
  const errors = error.response?.data.errors;
  if (!(errors instanceof Object)) return;

  Object.keys(errors).forEach(field => {
    errors[field].forEach(validationError => {
      const validation = validationError.split('.');
      if (validation.length !== 2 || validation[0] !== 'validation') {
        message = validationError;
        return;
      }

      if (validation[1].indexOf('required') === 0) {
        message = `The ${field} must be filled`;
      }

      if (validation[1].indexOf('unique') === 0) {
        message = `The ${field} is already registered`;
        if (responseURL.includes('/api/register')) {
          showToast = false;
        }
      }
    });
  });

  if (showToast) {
    Vue.toasted.show(message || error.response.data.message, { type: 'error' });
  }
  throw error;
}

/**
 * If an error object is passed capture the exception and throw a generic error.
 *
 * @param error
 * @param shouldShowToast default value is true
 */
export function handleGenericError(error, shouldShowToast = true) {
  if (error) {
    Sentry.captureException(error);
  }

  if (shouldShowToast) {
    Vue.toasted.show(ERROR_MESSAGE, { type: 'error' });
  }
  throw new Error(ERROR_MESSAGE);
}

/**
 * Handle generic request error
 *
 * @param error
 * @param shouldShowToast
 */
export function handleRequestError(error, shouldShowToast = true) {
  // Authorization error will be handled by apiClient
  if (error.response?.status === UNAUTHORIZED_ERROR_CODE) {
    return;
  }
  if (error.response?.status === VALIDATION_ERROR_CODE) {
    handleValidationError(error);
  }

  if (error.response?.status === BAD_REQUEST_ERROR_CODE) {
    if (shouldShowToast) {
      const response = error.response?.data;
      if (response.message) {
        Vue.toasted.show(response.message, { type: 'error' });
      } else if (response.errors && response.errors[0] && response.errors[0].title) {
        Vue.toasted.show(response.errors[0].title, { type: 'error' });
      }
    }
    throw error;
  }

  if ([NOT_FOUND_ERROR_CODE].indexOf(error.response?.status)) {
    throw error;
  }

  handleGenericError(error, shouldShowToast);
}

export function handleRouterError(error) {
  if (
    typeof error.name === 'string' &&
    typeof error.message === 'string' &&
    error.name === 'NavigationDuplicated' &&
    error.message.includes('Avoided redundant navigation to current location')
  ) {
    return;
  }
  handleGenericError(error, false);
}
