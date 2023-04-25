export const TOKEN_NAME = '_a';

const CookiesCoefficient = {
  SESSION: null,
  PERSISTENT: 1000 * 60 * 60 * 24
}

export function writeSessionCookie(name: string, value: string) {
  document.cookie = `${name}=${value}`;
}

/**
 * @param name Name của cookie.
 * @param value Value của cookie.
 * @param expireTime Thời gian mà cookie hết hạn, đơn vị là ngày.
 */
export function writePersistentCookie(name: string, value: string, expireTime: number) {
  expireTime = expireTime < 1 ? 1 : expireTime;
  let expires = "; expires=";
  let expireAt = new Date(CookiesCoefficient.PERSISTENT * expireTime! + Date.now());
  expires += expireAt.toUTCString();
  let cookieString = `${name}=${value}` + expires + "; path=/";
  document.cookie = cookieString;
}

export function readCookie(name: string) {
  let reg = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`);
  return document.cookie.replace(reg, "$1")
}

export function removePersistentCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;` 
}