import {
  USERNAME_PATTERN,
  PASSWORD_PATTERN,
  EMAIL_PATTERN
} from './constants'

import {
  InputDataProps,
  GroupInputsDataProps,
  ChipInputDataProps,
  TextInputDataProps,
  GroupChipInputsDataProps
} from 'src/types'

import { toThousandsSeparatedNumber, toIntNumber } from 'src/utils/number';

export const WHERE_INPUT_NAME = "where-input";
export const BUDGET_INPUT_NAME = "budget-input";
export const DURATION_INPUT_NAME = "duration-input";

export const USERNAME_INPUT_NAME = "username-input";
export const EMAIL_INPUT_NAME = "email-input";
export const FULLNAME_INPUT_NAME = "fullname-input";
export const PASSWORD_INPUT_NAME = "password-input";

// Tạm thời để dữ liệu ở đây
export const INTEREST_CHIPS: Array<ChipInputDataProps> = [
  {
    label: {
      text: "Nghệ thuật",
      icon: "artist-palette"
    },
    name: "art-interest-chip",
    value: "art",
    type: 'chip'
  },
  {
    label: {
      text: "Lịch sử",
      icon: "classical-building",
    },
    name: "history-interest-chip",
    value: "history",
    type: 'chip'
  },
  {
    label: {
      text: "Thức ăn",
      icon: "poultry-leg",
    },
    name: "food-interest-chip",
    value: "food",
    type: 'chip'
  },
  {
    label: {
      text: "Âm nhạc",
      icon: "musical-keyboard",
    },
    name: "music-interest-chip",
    value: "music",
    type: 'chip'
  },
  {
    label: {
      text: "Thiên nhiên",
      icon: "deciduous-tree",
    },
    name: "natural-interest-chip",
    value: "natural",
    type: 'chip'
  },
  {
    label: {
      text: "Thể thao",
      icon: "soccer-ball",
    },
    name: "sports-interest-chip",
    value: "sports",
    type: 'chip'
  },
  {
    label: {
      text: "Nhiếp ảnh",
      icon: "camera",
    },
    name: "photography-interest-chip",
    value: "photography",
    type: 'chip'
  },
  {
    label: {
      text: "Kiến trúc",
      icon: "castle",
    },
    name: "architecture-interest-chip",
    value: "architecture",
    type: 'chip'
  },
  {
    label: {
      text: "Công viên",
      icon: "national-park",
    },
    name: "park-interest-chip",
    value: "park",
    type: 'chip'
  },
  {
    label: {
      text: "Bãi biển",
      icon: "beach-with-umbrella",
    },
    name: "beach-interest-chip",
    value: "beach",
    type: 'chip'
  }
]

/**
 * Dữ liệu về form đăng nhập
 */
export const LOGIN_FORM: {[key: string]: TextInputDataProps} = {
  USERNAME_INPUT: {
    type: "text",
    name: USERNAME_INPUT_NAME,
    validate: {
      pattern: USERNAME_PATTERN,
      errorMessage: "Username chỉ được chứa chữ cái thường hoặc số và không được rỗng."
    },
    props: {
      placeholder: "Tên đăng nhập",
      required: true
    }
  } as TextInputDataProps,

  PASSWORD_INPUT: {
    type: "password",
    name: PASSWORD_INPUT_NAME,
    validate: {
      pattern: PASSWORD_PATTERN,
      errorMessage: "Password chỉ được chứa chữ cái thường hoặc số và không được rỗng."
    },
    props: {
      placeholder: "Mật khẩu",
      required: true
    }
  } as TextInputDataProps
}

/**
 * Dữ liệu về form đăng ký
 */
export const REGISTER_FORM: {[key: string]: TextInputDataProps} = {
  EMAIL_INPUT: {
    type: "email",
    name: EMAIL_INPUT_NAME,
    validate: {
      pattern: EMAIL_PATTERN,
      errorMessage: "Email không hợp lệ"
    },
    props: {
      placeholder: "E-mail",
      required: true,
      autoComplete: 'none'
    }
  } as TextInputDataProps,

  FULLNAME_INPUT: {
    type: "text",
    name: FULLNAME_INPUT_NAME,
    props: {
      placeholder: "Tên đầy đủ",
      required: true,
      autoComplete: 'none'
    }
  } as TextInputDataProps,

  USERNAME_INPUT: {
    type: "text",
    name: USERNAME_INPUT_NAME,
    validate: {
      pattern: USERNAME_PATTERN,
      errorMessage: "Username chỉ được chứa chữ cái thường hoặc số và không được rỗng."
    },
    props: {
      placeholder: "Tên đăng nhập",
      required: true,
      autoComplete: 'none'
    }
  } as TextInputDataProps,

  PASSWORD_INPUT: {
    type: "password",
    name: PASSWORD_INPUT_NAME,
    validate: {
      pattern: PASSWORD_PATTERN,
      errorMessage: "Password chỉ được chứa chữ cái thường hoặc số và không được rỗng."
    },
    props: {
      placeholder: "Mật khẩu",
      required: true,
      autoComplete: 'none'
    }
  } as TextInputDataProps
}

/**
 * Dữ liệu về form lấy yêu cầu của người dùng về du lịch.
 */
export const PROMPT_FORM: {[key: string]: TextInputDataProps | GroupInputsDataProps | ChipInputDataProps} = {
  WHERE_INPUT: {
    name: WHERE_INPUT_NAME,
    type: "text",
    label: {
      text: "Bạn muốn đi du lịch ở đâu?",
      icon: "round-pushpin",
    },
    props: {
      autoComplete: "none",
      required: true
    }
  } as TextInputDataProps,
  GROUP_1: {
    isGroup: true,
    baseName: 'input',
    inputs: [
      {
        name: BUDGET_INPUT_NAME,
        type: "text",
        label: {
          text: "Chi phí",
          icon: "money-bag",
          sub: "(VND)"
        },
        labelInputClassName: "me-2",
        props: {
          onInput: (e: any) => {
            let value = toIntNumber(e.target.value);
        
            if(Number.isNaN(value)) {
              e.target.value = "";
              return;
            }
        
            let formatted = toThousandsSeparatedNumber(value);
            e.target.value = formatted;
          }
        }
      },
      {
        name: DURATION_INPUT_NAME,
        type: "text",
        label: {
          text: "Trong bao lâu?",
          icon: "money-bag",
          sub: "(Ngày)"
        },
        props: {
          min: 1,
          max: 365
        }
      }
    ]
  } as GroupInputsDataProps,
  GROUP_2: {
    isChipGroup: true,
    isGroup: true,
    baseName: 'interest-chip',
    inputs: INTEREST_CHIPS,
    groupChipLabel: "Bạn bị hấp dẫn bởi:"
  } as GroupChipInputsDataProps,
}

/**
 * Hàm này dùng để render input được cung cấp từ `form`. Hiện tại thì chỉ có hỗ trợ render
 * 3 kiểu input đó là Text input, Group input (nhóm các input lại trong 1 group, cái này
 * thì tuỳ theo muốn render theo kiểu nào theo func `renderGroupInput`).
 * @param form Dữ liệu của form
 * @param renderTextInput
 * @param renderGroupInput 
 * @param renderGroupChipInput
 */
export function renderForm(
  form: {[key: string]: TextInputDataProps | GroupInputsDataProps | GroupChipInputsDataProps}, 
  renderTextInput?: (input: TextInputDataProps) => any,
  renderGroupInput?: (group: GroupInputsDataProps) => any,
  renderGroupChipInput?: (group: GroupChipInputsDataProps) => any,
  formKeys?: Array<string>,
) {
  let keys = formKeys ? formKeys : Object.keys(form);

  return keys.map(key => {
    if((form[key] as GroupChipInputsDataProps).isChipGroup && renderGroupChipInput) {
      let group = form[key] as GroupChipInputsDataProps;
      return renderGroupChipInput(group);
    }

    if((form[key] as GroupInputsDataProps).isGroup && renderGroupInput) {
      let group = form[key] as GroupInputsDataProps;
      return renderGroupInput(group);
    }

    return renderTextInput && renderTextInput(form[key] as TextInputDataProps)
  })
}

/**
 * Hàm này sẽ xử lý các tác vụ về sự kiện `onInput`. Nếu như luôn muốn trường hợp
 * false luôn thực thi thì:
 * 
 * `handleInputChangeWithCondition(false | undefined, undefined, () => {})`
 * Còn nếu như muốn luôn chạy trường hợp true thì ngược lại.
 * @param condition 
 * @param callWhenPass 
 * @param callWhenFail 
 */
export function handleInputChangeWithCondition(e: React.ChangeEvent<HTMLInputElement>) {
  return function(
    condition: boolean | (() => boolean) | undefined,
    callWhenPass: (text: string) => void,
    callWhenFail: (text: string) => void
  ) {
    let text  = e.target.value;
    if(condition || (typeof condition === "function" && (condition as (() => boolean))())) {
      callWhenPass(text);
    } else {
      callWhenFail(text);
    }
  }
}