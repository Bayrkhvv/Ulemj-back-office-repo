module.exports = {
  devServer: {
    https: process.env.VUE_APP_HOST_PROTOCOL === 'https:',
    host: process.env.VUE_APP_HOST_URL,
  },
};
