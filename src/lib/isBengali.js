export function isBengali(text = '') {
  return /[\u0980-\u09FF]/.test(text);
}
