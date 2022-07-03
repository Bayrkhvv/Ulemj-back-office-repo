/**
 * Regex for 1 uppercase alpha character, 1 digit and length between 6-128
 */
export default new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,128})');
