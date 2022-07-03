/* eslint-disable no-console */
const isProduction = process.env.NODE_ENV === 'production';

export const log = (message, ...args) => {
  if (!isProduction) console.log(message, args.length ? args : undefined);
};

export const error = err => {
  if (!isProduction) console.error(err);
};
