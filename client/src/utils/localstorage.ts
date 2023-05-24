import {
  LOCALSTORAGE_KEYS
} from './constants'

type LocalStorageKeys = keyof typeof LOCALSTORAGE_KEYS;

/*
  **QUY ĐỊNH**
  - LocalStorage sẽ được fix cứng, để tránh việc lưu các dữ liệu "lạ", "dữ liệu bên ngoài" một cách không kiểm soát.
  Cho nên nếu như có dữ liệu gì đó mới thì thêm key vào trong LOCALSTORAGE_KEYS.
*/

/**
 * Lấy dữ liệu trong `localStorage` với `key`. Nếu như `key` không tồn tại trong `LOCALSTORAGE_KEYS`
 * thì sẽ trả về `undefined`.
 * @param key Key trong LOCALSTORAGE_KEYS
 * @returns 
 */
export function getLocalStorageItem<T>(key: LocalStorageKeys) {
  if(!LOCALSTORAGE_KEYS[key]) return undefined;
  let item = localStorage.getItem(LOCALSTORAGE_KEYS[key]);

  if(!item) return null;

  return JSON.parse(item) as T;
}

/**
 * Set dữ liệu vào trong `localStorage` với `key`. Nếu như `key` không tồn tại trong `LOCALSTORAGE_KEYS`
 * thì không thêm dữ liệu này vào được đọc phần **Quy định** trong `src/utils/localstorage.ts`
 * @param key Key trong LOCALSTORAGE_KEYS
 * @param value Dữ liệu trả về từ `localStorage`
 * @returns 
 */
export function setLocalStorageItem<T>(key: LocalStorageKeys, value: T) {
  if(!LOCALSTORAGE_KEYS[key]) return;
  return localStorage.setItem(LOCALSTORAGE_KEYS[key], JSON.stringify(value));
}

/**
 * Remove dữ liệu đã set trong `localStorage` với `key`. Nếu như `key` không tồn tại trong `LOCALSTORAGE_KEYS`
 * thì sẽ trả về `false` ngược lại là `true`
 * @param key Key trong LOCALSTORAGE_KEYS
 * @returns 
 */
export function removeLocalStorageItem(key: LocalStorageKeys) {
  if(!LOCALSTORAGE_KEYS[key]) return false;
  localStorage.removeItem(LOCALSTORAGE_KEYS[key]);
  return true;
}