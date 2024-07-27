export const isNumeric = /^[0-9]+$/;
export const isAlphaNumeric = /^[a-zA-Z0-9_]+$/;
export const isValidCpf = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)|^(\d{11}|\d{14})$/;
export const isValidEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
export const isValidIp = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/
;