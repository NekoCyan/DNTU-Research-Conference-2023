import React from 'react'

type CreateMediaBreakPointOptionsProps = {
  canQueryWithMax?: boolean,
  shouldQueryWithMinIncreaseByOne?: boolean
}

/*
 ** LƯU Ý **
  Một số thứ cần lưu ý:
  - MediaQuery: là một object tạo ra từ `window.matchMedia(MediaBreakPoint)`. Để tạo được MediaQuery thì mình phải
  có Media Break Point.
  - Break Point: là điểm để tạo Media Break Point.
  - Media Break Point: có thể được hiểu là khoảng của độ rộng màn hình kiểu như từ 0px - 375px hoặc 375px - 768px.
  Mà tại đây, các MediaQuery sẽ quả lý các MBP này. Nếu như độ rộng màn hình nằm trong một vùng mà được MediaQuery
  quả lý, thì nó sẽ thực thi một công việc (xem thêm ở bên dưới).
*/

/**
 * Hàm này dùng để tạo ra các breakpoints. Tuỳ thuộc vào args mà nó sẽ trả về các kết quả khác nhau.
 * Về `options`:
 * - `canQueryWithMax?`: `default: true` Có query media với max hay không? Option này mình chỉ có thể dùng khi truyền
 * vào duy nhất một breakpoint (`firstPoint`).
 * - `shouldQueryWithMinIncreaseByOne?`: `default: true` Có nên tăng một khi query media với min hay không?
 * 
 * @param firstPoint breakpoint đầu tiên để tạo media break point.
 * @param secondPoint breakpoint thứ hai để tạo media break point.
 * @param options trong đây sẽ có một số option để configure kết quả trả về.
 * @returns 
 * 
 * @example
 * ```js
 * let firstPoint = "375";
 * let secondPoint = "768";
 * 
 * // Output: "(max-width: 375px)"
 * let mediaBreakPoint_1 = createMediaBreakPoint(firstPoint);
 * // Output: "(min-width: 376px) and (max-width: 768px)"
 * let mediaBreakPoint_2 = createMediaBreakPoint(firstPoint, secondPoint);
 * // Output: "(min-width: 376px)"
 * let mediaBreakPoint_3 = createMediaBreakPoint(firstPoint, undefined, {canQueryWithMax: false});
 * // Output: "(min-width: 375px)"
 * let mediaBreakPoint_4 = createMediaBreakPoint(firstPoint, undefined, {canQueryWithMax: false, shouldQueryWithMinIncreaseByOne: false});
 * ```
 */
function createMediaBreakPoint(firstPoint: number, secondPoint?: number, options?: CreateMediaBreakPointOptionsProps) {
  options = Object.assign<
    CreateMediaBreakPointOptionsProps,
    CreateMediaBreakPointOptionsProps | undefined
  >({
    shouldQueryWithMinIncreaseByOne: true,
    canQueryWithMax: false
  }, options)

  let increaseBy = options.shouldQueryWithMinIncreaseByOne ? 1 : 0;
  if(secondPoint) return `(min-width: ${firstPoint + increaseBy}px) and (max-width: ${secondPoint}px)`;
  if(options.canQueryWithMax) return `(max-width: ${firstPoint}px)`
  return `(min-width: ${firstPoint + increaseBy}px)`
}

/**
 * Hàm này dùng để tạo ra MediaQueryListEvent Handler, nhận vào một callBack. CallBack này
 * sẽ được gọi khi `MediaQuery.matches` trả về `true`.
 * @param callWhenMatch 
 * @returns 
 */
function createHandleMediaQueryChangeFn (callWhenMatch?: () => void) {
  return function(e: MediaQueryListEvent) {
    if(e.matches) {
      if(callWhenMatch) callWhenMatch();
    }
  }
}

let defaultBreakPoints = "375,768,1280";

type MatchDataProps = {
  range?: string
}

/**
 * *__Nhớ kéo xuống cuối để xem ví dụ__*
 * 
 * 
 * Hook này dùng để "lắng nghe" sự kiện "thay đổi" của MediaQuery (tạo từ `window.matchMedia(mediaBreakPoint)`).
 * Khi truyền vào hook này, thì tuỳ theo số lượng breakpoints trong đó mà các Media Break Point sẽ được tạo ra như sau:
 * - Nếu như truyền vào trong nó duy nhất một break point. Thì chỉ có một Media Break Point được tạo ra.
 * - Nếu như truyền vào trong nó nhiều hơn một break point (n BP). Thì sẽ có n + 1  Media Break Point được tạo ra.
 * 
 * Với mỗi một Media Break Point, thì sẽ có một Handler "lắng nghe" sự kiện thay đổi. Ngoài ra thì chúng ta còn có một thông
 * số nữa, là `range`. `range` sẽ cho biết màn hình này match với khoảng nào.
 * 
 * Ví dụ, có input như default: "375,768,1280". Input này sẽ tạo ra `BreakPointArr = [375, 768, 1280]`.
 * Sau đó tạo `ranges` và các `mediaQueries`. Để tạo được MediaQuery thì mình mình phải có Media Break Point.
 * MediaBreakPoints sẽ được tạo từ BreakPointArr, nếu có `n` BP thì tạo ra `n + 1` MBP và MQ. Cụ thể:
 * 
 * `(max-width: BP(1)px), ..., (min-width: (BP(n) + 1)px) and (max-with: BP(n + 1)), (min-width: (BP(n + 1) + 1)px)`
 * 
 * Khi có được các MediaBreakPoints thì các MediaQueries sẽ được tạo ra. Đồng thời các `ranges` tương ứng sẽ được rạo ra. Cụ thể:
 * 
 * `[0,BP(1)], ...,[BP(n) + 1,BP(n + 1)], [BP(n + 1) + 1,]`
 * 
 * Cuối cùng thì hook này sẽ trả về một object chứa thuộc tính `range`. Mỗi khi MediaBreakPoint nào match, thì `range` sẽ có
 * kết quả tương ứng trong `ranges`. Giả sử màn hình có kích thước là 820px, thì `match = { range: [769,1280] }`
 * 
 * @param breakPoints `default: "375,768,1280"` Các Break Points trên màn hình. Theo dạng `"points_1,points_2,points_3"`.
 * @returns
 * 
 * @example
 * ```jsx
 * import { useMediaQuery } from 'src/hooks/useMediaQuery'
 * 
 * export default function MyComponent() {
 *   // Nếu không truyền gì vào `useMediaQuery()` thì các breakPoints mặc định là "375,768,1280"
 *   let match = useMediaQuery();
 * 
 *   return (
 *     match.range === "[0,375]" && <ComponentA />
 *     match.range === "[376,768]" && <ComponentB />
 *     match.range === "[769,1280]" && <ComponentC />
 *     match.range === "[1281,]" && <ComponentD />
 *   );
 * }
 * ```
 */
export function useMediaQuery(
  breakPoints: string = defaultBreakPoints
) {
  let breakPointArr = React.useMemo(() => {
    let arr = breakPoints.split(",").map(breakPoint => parseInt(breakPoint))
    return arr.sort((a, b) => a - b);
  }, [breakPoints]);

  let { mediaQueries, ranges } = React.useMemo(() => {
    let breakPointArrLength = breakPointArr.length;
    let _mediaQueries: Array<MediaQueryList> = [];
    let _ranges: Array<string> = [];

    for(let i = 0; i < breakPointArrLength; i++) {
      let breakPoint = breakPointArr[i];
      let mediaBreakPoint = createMediaBreakPoint(breakPointArr[i - 1], breakPoint);
      let range = `[${breakPointArr[i - 1] + 1},${breakPoint}]`;

      let lastMediaBreakPoint;
      let lastRange;

      if(i === 0) {
        mediaBreakPoint = createMediaBreakPoint(breakPoint, undefined, {canQueryWithMax: true});
        range = `[0,${breakPoint}]`;
      } else if(i === breakPointArr.length - 1) {
        lastMediaBreakPoint = createMediaBreakPoint(breakPoint, undefined);
        lastRange = `[${breakPoint + 1},]`
      }

      _mediaQueries.push(window.matchMedia(mediaBreakPoint));
      _ranges.push(range);
      if(lastMediaBreakPoint) _mediaQueries.push(window.matchMedia(lastMediaBreakPoint));
      if(lastRange) _ranges.push(lastRange);
    }

    return {
      mediaQueries: _mediaQueries,
      ranges: _ranges
    }
  }, [breakPointArr]);

  const firstMatch = React.useMemo((): MatchDataProps => {
    let matchedIndex = mediaQueries.findIndex(mediaQuery => mediaQuery.matches)
    return {
      range: matchedIndex >= 0 ? ranges[matchedIndex] : undefined
    }
  }, [mediaQueries, ranges]);

  const [match, setMatch] = React.useState<MatchDataProps>({
    range: firstMatch.range
  });

  
  React.useEffect(() => {
    let mediaQueryHandlers: Array<(e: MediaQueryListEvent) => void> = [];

    mediaQueries.forEach((mediaQuery, index) => {
      let mediaQueryHandler = createHandleMediaQueryChangeFn(
        () => {
          console.log(`Match width range: ${ranges[index]}`);
          setMatch(prevState => ({...prevState, range: ranges[index]}))
        }
      );

      mediaQueryHandlers.push(mediaQueryHandler);
      mediaQuery.addEventListener('change', mediaQueryHandler);
    });

    return function() {
      mediaQueryHandlers.forEach((mediaQueryHandler, index) => {
        mediaQueries[index].removeEventListener('change', mediaQueryHandler);
      });
    }
  }, [breakPointArr, mediaQueries, ranges]);

  console.log("Media Queries: ", mediaQueries);

  return match;
}