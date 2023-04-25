const metrics = ['N', 'Tr', 'T', 'Unknown'];

const numberFormatter = new Intl.NumberFormat('vi');

export const formattedNumberPattern = /^(\d{1,3}\.)(\d{3}\.)*(\d{3})$/;

/**
 * Số bình thường có dạng là `nnnnnnnnn.ddd`, khi truyền vào trong hàm này thì nó sẽ chuyển thành một chuỗi có dạng là
 * `nnn.nnn.nnn,ddd`
 * 
 * @param number - Số cần chuyển đổi có dạng là `nnnnnnnnn.ddd`
 * @returns Một chuỗi có dạng là `nnn.nnn.nnn,ddd`.
 */
export function toThousandsSeparatedNumber(number: number) {
  return numberFormatter.format(number);
};

/**
 * Hàm này sẽ trả về số bình thường (số nguyên).
 * @param thousandsSeparatedNumber Số được đã được format (thành dạng nnn.nnn.nnn,ddd).
 * @returns 
 */
export function toIntNumber(thousandsSeparatedNumber: string) {
  let num = thousandsSeparatedNumber.split('.').join("");
  return Number(num);
}

/**
 * Số bình thường có dạng là `nnnnnnnnn.ddd`, tuỳ thuộc xem có bao nhiêu chữ số trong số thì chuỗi trả về cũng sẽ khác.
 * VD:
 * * `3000` -> `3 N`
 * * `248907.4872` -> `248 N`
 * * `9877724` -> `9,8 Tr`
 * 
 * @param number - Số cần chuyển đổi có dạng là `nnnnnnnnn.ddd`
 * @returns Một chuỗi có dạng là `(n | n,n) (N | Tr | T)`.
 */
export function toMetricNumber(number: number) {
  const formatedNumber = toThousandsSeparatedNumber(number);
  let [firstThreeDigit, ...remainParts] = formatedNumber.split('.');

  if (firstThreeDigit.length === 1 && remainParts[0][0] !== "0") {
    firstThreeDigit += ',' + remainParts[0][0];
  }

  const remainPartsLength = remainParts.length;

  if (remainPartsLength === 0) return firstThreeDigit;
  return firstThreeDigit + ' ' + metrics[remainPartsLength - 1];
};

/**
 * Trả về một số ngầu nhiên nằm trong khoảng `min` - `max`.
 * @param {number} max Số lớn nhất có thể lấy ngẫu nhiên được.
 * @param {number} min Số nhỏ nhất có thể lấy ngẫu nhiên được.
 * @returns 
 */
export function getRandomNumber(max = 10, min = 0) {
  return Math.round(Math.random() * (max - min) + 1);
}