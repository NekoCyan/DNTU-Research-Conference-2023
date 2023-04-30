/**
 * Hàm sẽ so sánh 2 Số, chuỗi đối tượng hoặc function nào đó (gọi chung là đối tượng đi). Để kiểm tra xem
 * 2 đối tượng đó có giống nhau không? Không chỉ về ref mà còn là key và value.
 * @param a Số, chuỗi, đối tượng hoặc function đầu tiên muốn so sánh.
 * @param b Số, chuỗi, đối tượng hoặc function thứ hai muốn so sánh.
 * @returns
 * 
 * @example
 * 
 * ...
 * let obj1 = { a: 123, b: [ { c: 1 }, 23 ] }
 * let obj2 = { a: 123, b: [ { c: 1 }, 23 ] }
 * 
 * console.log(deepCompare(obj1, obj2)); // Output: true
 * ...
 */
export function deepCompare(a: any, b: any) {
  let check = true;

  // Check trước ở đây, vì a và b có thể là số, chuỗi.ư
  // Tuy nhiên a và b cùng lưu một ref của một object hoặc array, thì có thể bằng nhau. Nhưng trường hợp này check sau.
  check = a === b;

  // Nếu cả a và b là function thì check luôn ở đây.
  if(a instanceof Function && b instanceof Function) {
    console.log(a);
    console.log(b);
    return a.toString() === b.toString();
  }
  
  // Nếu là array
  if (a instanceof Array) {
    check = true;
    if (a.length !== b.length) return false;
    // Nếu như a và b bằng ref (địa chỉ vùng nhớ) thì trả về true luôn, đỡ phải so sánh.
    if(a === b) return true;
    for (let index in a) {
      if (a[index] instanceof Object && !deepCompare(a[index], b[index]))
        return false;
      if (!(a[index] instanceof Object) && a[index] !== b[index]) return false;
    }
  }
  
  // Nếu là object
  if (a instanceof Object && !(a instanceof Array)) {
    let propsA = Object.getOwnPropertyNames(a);
    let propsB = Object.getOwnPropertyNames(b);
    check = true;
    // Ở đây thì mình chỉ cần check length của propsA và propsB
    if(propsA.length !== propsB.length) return false;
    // Nếu như a và b bằng ref (địa chỉ vùng nhớ) thì trả về true luôn, đỡ phải so sánh.
    if(a === b) return true;
    for (let prop in a) {
      if (!b[prop]) return false;
      if (!deepCompare(a[prop], b[prop])) return false;
    }
  }
  return check;
}

/**
 * Trả về một mảng mới đã remove item theo `condition`. Không nên dùng mảng
 * quá sâu.
 * @param arr 
 * @param selectValueToCompare 
 */
export function removeFrom<T>(arr: Array<T>, selectValueToCompare: (ele: T, index: number) => any, value: any) {
  if(arr.length === 1) return [];
  let cpArr = arr.slice();
  return cpArr.filter((ele, index) => selectValueToCompare(ele, index) !== value)
}