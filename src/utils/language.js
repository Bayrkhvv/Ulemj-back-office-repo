export default () => {
  if (navigator.languages !== undefined) {
    return navigator.languages[0].toString();
  }
  if (navigator.language) {
    return navigator.language.toString();
  }
  return 'en-US';
};
