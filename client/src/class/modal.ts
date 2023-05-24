import {
  autoBind
} from 'src/utils/functions'

import {
  ModalItemType,
  ModalItemResult,
  ModalItemDataProps,
  ModalItemOptionsDataProps
} from 'src/types/index'

/**
 * Tạo ra một object quản lý model. Mỗi một object này sẽ quản lý duy nhất một Modal.
 */
class Modal {
  private _modal!: HTMLDivElement;
  private _items: {[key: string]: ModalItemDataProps} = {};
  private _subscribedModal: any = undefined;
  private _resolveFns!: {[key: string]: (value: ModalItemResult) => void};
  private _itemsQueue!: Array<{name: string, item: ModalItemDataProps}>;
  private _transferredDatas!: {[key: string]: any};

  private messageError = {
    modalNotFound: () => "Modal not found: use modal.init func to inject the Modal Element (div element).",
    componentNotFound: (name: string) => "Component not found: " + name,
    subscribeError: (message: string) => "Subscribe error: " + message
  }

  constructor() {
    autoBind(this);
  }

  /**
   * Phương thức này dùng để lấy ref của modal (Thẻ div hay phần tử div).
   * @returns
   */
  public getModal() {
    try {
      if(this.isModalExist()) throw new Error(this.messageError.modalNotFound());
      return this._modal;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  /**
   * Phương thức này dùng để khởi tạo một modal. Một modal được khởi tạo sau khi React Element
   * khởi tạo xong. Lúc đó mới có thể lấy được ref của Element (Node thiệt).
   * @param element Là ref của modal (Thẻ div hay phần tử div).
   */
  public init(element: HTMLDivElement) {
    if(!this._modal) {
      this._modal = element;
      if(this._itemsQueue) {
        for(let item of this._itemsQueue)
          this.addItem(item.name, item.item.component, item.item.type, item.item.options);
      }
    };
  }

  /**
   * Phương thức này kiểm tra xem là Ref của modal có tồn tại hay là không?
   * (Xuất hiện ở trên Document hay chưa?)
   * @returns
   */
  public isModalExist() {
    if(!this._modal || !(this._modal instanceof HTMLDivElement)) return false;
    return true;
  }

  /**
   * Phương thức này dùng để đăng ký cho duy nhất một modal một function dùng để gọi
   * lại mỗi khi có Modal Item nào đó được hiện lên.
   * @param callBack Hàm dùng để gọi lại mỗi khi có Modal Item nào đó được hiện lên.
   */
  public subscribeModal(callBack: (shownItem: () => JSX.Element, name: string, type: ModalItemType, options: ModalItemOptionsDataProps) => void) {
    if(!this._subscribedModal) this._subscribedModal = callBack;
  }

  /**
   * Phương thức này dùng để thêm một Modal Item vào trong Modal.
   * @param name (Key) Tên của Modal Item.
   * @param element Function component của Item.
   * @param type Kiểu của Modal Item này.
   * @param options
   * 
   * @example 
   * ```jsx
   * import { modal } from 'src/class/modal';
   * 
   * // Trong file MyDialog.tsx
   * export default function MyDialog() {
   *   return <div className="ramdom-classname-hehe"><p>Hello</p></div>;
   * }
   * ```
   * 
   * @example
   * ```jsx
   * // Import Dialog này vào trong Modal.tsx
   * // Trong file Modal.tsx
   * import { modal } from 'src/class/modal';
   * import MyDialog '../my_dialog/MyDialog';
   * 
   * // Tên thì đặt kiểu gì cũng được, không nhất thiết phải dùng camel case. Nhưng quan trọng là khi xài phải đúng tên.
   * modal.addItem("myDialog", MyDialog, "dialog", { hasDarkBG: true });
   * 
   * export default function Modal() {...}
   * ```
   */
  public addItem(name: string, component: () => JSX.Element, type: ModalItemType = "dialog", options?: ModalItemOptionsDataProps) {
    try {
      console.log("ADD ITEM?");
      if(!this.isModalExist()) {
        if(!this._itemsQueue) this._itemsQueue = [];
        this._itemsQueue.push({
          name: name,
          item: {
            component,
            type,
            options,
            close: this._createCloseAction(name)
          }
        })
      }
      if(!component) throw new Error(this.messageError.subscribeError("Function component require!"));

      if(!this._items[name]) {
        this._items[name] = {
          type: type,
          component,
          close: this._createCloseAction(name),
          options: {...options}
        } as ModalItemDataProps;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  /**
   * Phương thức này dùng để hiển thị một Modal Item. Ngoài ra thì mình còn có thể nhận được dữ liệu từ
   * modal đó nữa (Tuỳ vào việc hàm `close` bên kia có truyền dữ liệu hay không?).
   * 
   * Xem thêm trong `Itinerary.tsx`.
   * @param name Tên của Modal Item muốn hiện (Phải đúng tên và Modal Item này đã được thêm từ trước đó).
   * @example
   * ```js
   * // Nhận dữ liệu từ modal.
   * const handleShowMyDialog = e => modal.show("myDialog").then(data => {
   *   console.log("Result: ", data?.result);
   *   console.log("Message: ", data?.message);
   *   console.log("Data: ", data?.data);
   * })
   * 
   * // Ngoài ra thì mình còn có thể truyền dữ liệu.
   * const handleShowMyDialog = e => modal.show("myDialog", { say: "Hello" });
   * ```
   */
  public show(name: string, data?: any): Promise<ModalItemResult | undefined> {
    try {
      if(!this.isModalExist()) throw new Error(this.messageError.modalNotFound());
      console.log("ITEM(s): ", this._items);
      if(!this._items || !this._items[name].component) throw new Error(this.messageError.componentNotFound(name));
      let that = this;

      if(data) {
        if(!this._transferredDatas) this._transferredDatas = {};
        this._transferredDatas[name] = { ...data };
      }

      this._subscribedModal(this._items[name].component, name, this._items[name].type, this._items[name].options);

      return new Promise((res, rej) => {
        if(!that._resolveFns) that._resolveFns = {};
        if(!that._resolveFns[name]) that._resolveFns[name] = res;
        // this._modal.classList.add('show');
      });
    } catch (error: any) {
      console.error(error.message);
      return Promise.resolve(undefined);
    }
  }

  /**
   * Phương thức này dùng để lấy ra các actions của một Modal Item. Bao gồm `close` (Tương lai có thể update thêm).
   * @param name Tên của Modal Item muốn lấy action (Phải đúng tên và Modal Item này đã được thêm từ trước đó).
   * @returns 
   */
  public getItemActions(name: string) {
    try {
      if(!this.isModalExist()) throw new Error(this.messageError.modalNotFound());
      if(!this._items[name] || !this._items[name].component) throw new Error(this.messageError.componentNotFound(name));

      return {
        close: this._items[name].close
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  /**
   * Phương thức này dùng để chuyển data từ `show` cho các Modal Item (component) thông qua `name`. Nếu như Modal
   * Item hay component modal không tồn tại thì sẽ báo lỗi. Nếu như không có dữ liệu thì trả về `undefined`.
   * @param name Tên của Modal Item muốn lấy action (Phải đúng tên và Modal Item này đã được thêm từ trước đó).
   * @returns 
   */
  public getTransferredData<T>(name: string) {
    try {
      if(!this.isModalExist()) throw new Error(this.messageError.modalNotFound());
      if(!this._items[name] || !this._items[name].component) throw new Error(this.messageError.componentNotFound(name));
      if(!this._transferredDatas) return undefined;
      if(!this._transferredDatas[name]) return undefined;

      let transferredData = this._transferredDatas[name] as T;
      delete this._transferredDatas[name];

      return transferredData;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  /// PRIVATE METHODS
  /**
   * Phương thức này dùng để unmount Modal Item khỏi DOM và ẩn modal đi.
   * @param name Tên của Modal Item muốn hiện (Phải đúng tên và Modal Item này đã được thêm từ trước đó).
   */
  private _hide(name: string) {
    try {
      if(!this.isModalExist()) throw new Error(this.messageError.modalNotFound());
      if(!this._items[name] || !this._items[name].component) throw new Error(this.messageError.componentNotFound(name));

      this._subscribedModal(null, name, this._items[name].type, this._items[name].options);
      // this._modal.classList.remove('show');

    } catch (error: any) {
      console.error(error.message);
    }
  }

  /**
   * Phương thức này dùng để tạo action `close` cho Modal Item.
   * @param name Tên của Modal Item.
   * @returns 
   */
  private _createCloseAction(name: string) {
    let that = this;
    return function(result: boolean = true, message?: string, data?: any) {
      that._hide(name);
      let res = that._resolveFns[name];
      delete that._resolveFns[name];
      res({
        data: data,
        message: message,
        result: result
      });
      
      return Promise.resolve(result);
    }
  }
}

/**
 * Hiện tại thì chỉ có duy nhất object này quản lý modal trong app.
 * 
 * @example
 * ```jsx
 * const { modal } from 'src/class/modal';
 * 
 * // Lấy ra các actions của modal item, bao gồm `close` và `ok`.
 * // Lưu ý, khi lấy ra thì nhớ ghi đúng tên của Modal Item, nếu không sẽ báo lỗi và nhận về 2 kết quả `undefined`.
 * // Xem thêm ở file App.tsx, LeftSideInformation.tsx và Itinerary.tsx.
 * // Và LeftSideInformation đã được thêm vào Modal với tên là `leftSideInformation`
 * 
 * // Itinerary.tsx
 * // Giờ thử show ở Itinerary (xem thêm trong Itinerary.tsx)
 * const handleOpenLeftSideInfo = e => {
 *   // Điền đúng tên, là key của prop `items`.
 *   // Khi modal này được close ở bên LeftSideInformation, nó sẽ nhận được các thông số như sau
 *   modal
 *     .show("leftSideInformation")
 *     .then(data => {
 *       console.log("Result: ", data?.result); // Log: "Result: false"
 *       console.log("Message: ", data?.message); // Log: "Message: Hello from LeftSideInformation"
 *       console.log("Data: ", data?.data); // Log: "Data: undefined"
 *     })
 * }
 * 
 * /// LeftSideInformation.tsx
 * // Lấy các action của leftSideInformation trong modal ra.
 * const { ok, close } = model.getItemActions("leftSideInformation"); // Đây là tên đúng và đã được add.
 * const handleCloseSide = e => {
 *   // Tham số đầu tiên cho biết kết quả của modal.
 *   // Tham số thứ 2 là message.
 *   // Tham số thứ 3 là dữ liệu muốn truyền tới cho `show`.
 *   close(false, "Hello from LeftSideInformation");
 * }
 * ```
 * 
 * Xem thêm trong `src/class/modal.ts`.
 */
const modal = new Modal();

export {
  modal
}