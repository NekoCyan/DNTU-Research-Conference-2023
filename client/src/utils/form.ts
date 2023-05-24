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
  GroupChipInputsDataProps,
  SelectDataProps,
  SelectOptionDataProps,
  GroupSelectDataProps,
  FormElementValuesProps
} from 'src/types'

import { toThousandsSeparatedNumber, toIntNumber } from 'src/utils/number';

export const WHERE_INPUT_NAME = "destination-input";
export const BUDGET_INPUT_NAME = "budget-input";
export const DURATION_INPUT_NAME = "duration-input";
export const ACCOMMODATION_SELECT_NAME = "accommodation-select";
export const TRAVELWITH_SELECT_NAME = "travelWith-select";
export const TRANSPORTATION_SELECT_NAME = "moveByVehicle-select";

export const USERNAME_INPUT_NAME = "username-input";
export const EMAIL_INPUT_NAME = "email-input";
export const FULLNAME_INPUT_NAME = "fullname-input";
export const PASSWORD_INPUT_NAME = "password-input";
export const SAVE_ITINERARY_NAME_INPUT_NAME = "itineraryName-input";

export const CUISINE_CHIP_NAME = 'cuisines-chip';
export const INTEREST_CHIP_NAME = 'interests-chip';
export const ACTIVITIES_CHIP_NAME = 'activities-chip';
export const ITINERARY_RESPONSE_LANGUAGUE_CHIPS_NAME = 'language-chip';
export const SAVE_ITINERARY_COLOR_CHIPS_NAME = 'color-chip';

export const SAVE_ITINERARY_COLORS = ['#FE2727', '#FEC227', '#9FFE27', '#149312', '#42CBB2', '#4754CC', '#000A64', '#B527CC', '#44044F', '#E700B4', '#FF86E4', '#F34A68'];

const passwordErrorMessage = "Password bao gồm 8 (hoặc hơn) các kí tự từ a-zA-Z 0-9 !@#$%^&*()_+,.<>/?;:'\"'`~ và khoảng trắng";
const usernameErrorMessage = "Username chỉ được chứa chữ cái thường hoặc số và không được rỗng.";


export interface FormPromptDataProps {
  [key: string]: TextInputDataProps | GroupInputsDataProps | ChipInputDataProps | SelectDataProps | GroupSelectDataProps
}

// Tạm thời để dữ liệu ở đây
export const INTEREST_CHIPS: Array<ChipInputDataProps> = [
  {
    elementType: "chip",
    label: {
      text: "Nghệ thuật",
      icon: "artist-palette"
    },
    name: INTEREST_CHIP_NAME,
    value: "art",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Lịch sử",
      icon: "classical-building",
    },
    name: INTEREST_CHIP_NAME,
    value: "history",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Thức ăn",
      icon: "fork-and-knife-with-plate",
    },
    name: INTEREST_CHIP_NAME,
    value: "food and drink",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Âm nhạc",
      icon: "musical-note",
    },
    name: INTEREST_CHIP_NAME,
    value: "music",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Thiên nhiên",
      icon: "deciduous-tree",
    },
    name: INTEREST_CHIP_NAME,
    value: "natural",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Thể thao",
      icon: "soccer-ball",
    },
    name: INTEREST_CHIP_NAME,
    value: "sports",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Nhiếp ảnh",
      icon: "camera",
    },
    name: INTEREST_CHIP_NAME,
    value: "photography",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Công viên",
      icon: "national-park",
    },
    name: INTEREST_CHIP_NAME,
    value: "park",
    type: 'chip'
  }
]

/**
 * Dữ liệu cho activities
 */
export const ACTIVITIES_CHIP: Array<ChipInputDataProps> = [
  {
    elementType: "chip",
    label: {
      text: "Ngoài trời",
    },
    name: ACTIVITIES_CHIP_NAME,
    value: "outdoor",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Trong nhà",
    },
    name: ACTIVITIES_CHIP_NAME,
    value: "indoor",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Giải trí",
    },
    name: ACTIVITIES_CHIP_NAME,
    value: "entertainment",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Ngắm cảnh",
    },
    name: ACTIVITIES_CHIP_NAME,
    value: "sigth seeing",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Mua sắm",
    },
    name: ACTIVITIES_CHIP_NAME,
    value: "shopping",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Vui chơi",
    },
    name: ACTIVITIES_CHIP_NAME,
    value: "amusement",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Về đêm",
    },
    name: ACTIVITIES_CHIP_NAME,
    value: "nightlife",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Khám phá",
    },
    name: ACTIVITIES_CHIP_NAME,
    value: "explore",
    type: 'chip'
  }
]

/**
 * Dữ liệu cho cuisines
 */
export const CUISINES_CHIP: Array<ChipInputDataProps> = [
  {
    elementType: "chip",
    label: {
      text: "Đường phố",
    },
    name: CUISINE_CHIP_NAME,
    value: "street food",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Hải sản",
    },
    name: CUISINE_CHIP_NAME,
    value: "see food",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Đặc sản",
    },
    name: CUISINE_CHIP_NAME,
    value: "specialty food",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Đồ chay",
    },
    name: CUISINE_CHIP_NAME,
    value: "vegan",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Ăn vặt",
    },
    name: CUISINE_CHIP_NAME,
    value: "junk food",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Đồ ăn nhanh",
    },
    name: CUISINE_CHIP_NAME,
    value: "fast food",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Đồ ăn mặn",
    },
    name: CUISINE_CHIP_NAME,
    value: "savoury food",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Đồ ăn nước",
    },
    name: CUISINE_CHIP_NAME,
    value: "broth food",
    type: 'chip'
  },
  {
    elementType: "chip",
    label: {
      text: "Đồ ngọt",
    },
    name: CUISINE_CHIP_NAME,
    value: "sweeties food",
    type: 'chip'
  }
]

/**
 * Dữ liệu cho ngôn ngữ trả về
 */
export const ITINERARY_RESPONSE_LANGUAGUE_CHIPS: Array<ChipInputDataProps> = [
  {
    elementType: "chip",
    label: {
      icon: "flag-vietnam"
    },
    name: ITINERARY_RESPONSE_LANGUAGUE_CHIPS_NAME,
    value: "vietnamese",
    type: 'radio-chip',
    props: {
      defaultChecked: true
    }
  },
  {
    elementType: "chip",
    label: {
      icon: "flag-united-states"
    },
    name: ITINERARY_RESPONSE_LANGUAGUE_CHIPS_NAME,
    value: "english",
    type: 'radio-chip'
  }
]

/**
 * Dữ liệu cho color
 */
export const SAVE_ITINERARY_COLOR_CHIPS: Array<ChipInputDataProps> = SAVE_ITINERARY_COLORS.map(color => ({
  elementType: "chip",
  type: 'radio-chip',
  label: {
    text: color
  },
  name: SAVE_ITINERARY_COLOR_CHIPS_NAME,
  value: color,
  props: {
    nonPadding: true,
    shape: 'circle'
  }
}))

/**
 * Dữ liệu cho accommodation
 */
export const ACCOMMODATION_OPTIONS: Array<SelectOptionDataProps> = [
  {
    label: "Khách sạn",
    name: "hotel-accommodation-option",
    value: 'hotel'
  },
  {
    label: "Homestay",
    name: "homestay-accommodation-option",
    value: 'homestay'
  },
  {
    label: "Chung cư cho thuê (ngắn hạn)",
    name: "shorttermrentalcondominium-accommodation-option",
    value: 'short term rental condominium'
  }
]

/**
 * Dữ liệu cho travelwith
 */
export const TRAVELWITH_OPTIONS: Array<SelectOptionDataProps> = [
  {
    label: "Một mình",
    name: "alone-travelwith-option",
    value: 'alone'
  },
  {
    label: "Gia đình",
    name: "family-travelwith-option",
    value: 'family'
  },
  {
    label: "Bạn bè",
    name: "friends-travelwith-option",
    value: 'friends'
  },
  {
    label: "Người yêu",
    name: "lover-travelwith-option",
    value: 'lover'
  },
  {
    label: "Đồng nghiệp",
    name: "coworkers-travelwith-option",
    value: 'co-workers'
  }
]

/**
 * Dữ liệu cho transport
 */
export const TRANSPORTATION_OPTIONS: Array<SelectOptionDataProps> = [
  {
    label: "Xe buýt",
    name: "transportation-coworkers-option",
    value: 'bus'
  },
  {
    label: "Xe đạp",
    name: "transportation-bicyle-option",
    value: 'bicyle'
  },
  {
    label: "Xe máy",
    name: "transportation-bike-option",
    value: 'bike'
  },
  {
    label: "Xe oto",
    name: "transportation-car-option",
    value: 'car'
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
      errorMessage: usernameErrorMessage
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
      errorMessage: passwordErrorMessage
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
      errorMessage: usernameErrorMessage
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
      errorMessage: passwordErrorMessage
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
export const PROMPT_FORM: FormPromptDataProps = {
  WHERE_INPUT: {
    elementType: "input",
    name: WHERE_INPUT_NAME,
    type: "text",
    labelInputClassName: 'pt-xxl',
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
    elementType: "group-input",
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
          },
          minLength: 6,
          maxLength: 12
        }
      },
      {
        name: DURATION_INPUT_NAME,
        type: "number",
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
    elementType: "group-chip-input",
    baseName: INTEREST_CHIP_NAME,
    inputs: INTEREST_CHIPS,
    groupChipLabel: "Bạn bị hấp dẫn bởi:"
  } as GroupChipInputsDataProps,
  GROUP_3: {
    elementType: "group-select",
    baseName: "accommodation-travelwith",
    selects: [
      {
        name: ACCOMMODATION_SELECT_NAME,
        label: {
          text: "Bạn muốn nghỉ ở đâu?"
        },
        options: ACCOMMODATION_OPTIONS
      },
      {
        name: TRAVELWITH_SELECT_NAME,
        label: {
          text: "Bạn đi du lịch với?"
        },
        options: TRAVELWITH_OPTIONS
      }
    ]
  } as GroupSelectDataProps,
  TRANSPORTATION: {
    elementType: "select",
    name: TRANSPORTATION_SELECT_NAME,
    label: {
      text: "Bạn di chuyển bằng phương tiện gì?"
    },
    options: TRANSPORTATION_OPTIONS
  } as SelectDataProps,
  GROUP_4: {
    elementType: "group-chip-input",
    baseName: 'activities-chip',
    inputs: ACTIVITIES_CHIP,
    groupChipLabel: "Những hoạt động"
  } as GroupChipInputsDataProps,
  GROUP_5: {
    elementType: "group-chip-input",
    baseName: 'cusine-chip',
    inputs: CUISINES_CHIP,
    groupChipLabel: "Ẩm thực"
  } as GroupChipInputsDataProps,
  GROUP_6: {
    elementType: "group-chip-input",
    baseName: 'itinerary-response-language-chip',
    inputs: ITINERARY_RESPONSE_LANGUAGUE_CHIPS,
    groupChipLabel: "Lịch trình của hành trình sẽ được hiển thị bằng ngôn ngữ"
  } as GroupChipInputsDataProps,
}

export const SAVE_ITINERARY_FORM: {
  ITINERARY_NAME_INPUT: TextInputDataProps,
  GROUP_COLOR_CHIP: GroupChipInputsDataProps
} = {
  ITINERARY_NAME_INPUT: {
    name: SAVE_ITINERARY_NAME_INPUT_NAME,
    elementType: "input",
    type: "text",
    props: {
      autoComplete: "none",
      required: true,
      placeholder: "Tên của lịch trình"
    }
  },
  GROUP_COLOR_CHIP: {
    elementType: "group-chip-input",
    baseName: SAVE_ITINERARY_COLOR_CHIPS_NAME,
    inputs: SAVE_ITINERARY_COLOR_CHIPS,
    groupChipLabel: "Màu"
  }
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
  form: FormPromptDataProps, 
  renderTextInput?: (input: TextInputDataProps) => any,
  renderGroupInput?: (group: GroupInputsDataProps) => any,
  renderGroupChipInput?: (group: GroupChipInputsDataProps) => any,
  renderSelect?: (select: SelectDataProps) => any,
  renderGroupSelect?: (group: GroupSelectDataProps) => any,
  formKeys?: Array<string>
) {
  let keys = formKeys ? formKeys : Object.keys(form);

  return keys.map(key => {
    if(form[key].elementType === "select" && renderSelect) {
      let select = form[key] as SelectDataProps;
      return renderSelect(select);
    }

    if(form[key].elementType === "group-select" && renderGroupSelect) {
      let group = form[key] as GroupSelectDataProps;
      return renderGroupSelect(group);
    }

    if(form[key].elementType === "group-chip-input" && renderGroupChipInput) {
      let group = form[key] as GroupChipInputsDataProps;
      return renderGroupChipInput(group);
    }

    if(form[key].elementType === "group-input" && renderGroupInput) {
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

/**
 * Hàm này dùng để lấy value từ form element. Với những element có thuộc tính `value`. Và tuỳ
 * vào từng kiểu form element thì mình sẽ có từng cách lấy value khác nhau.
 * @param formEle Phần tử của form, có thể là input, radio node list (là các input type = checkbox | radio), ngoài ra cũng có thể là select.
 */
export function getValuesOfFormElement(formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement) {
  let data: FormElementValuesProps = {
    values: undefined,
    elementName: undefined
  };
  
  if(formEle instanceof HTMLInputElement) {
    // Cái này thì cơ bản rồi
    data.values = formEle.value;
    data.elementName = formEle.name;
  }

  if(formEle instanceof HTMLSelectElement) {
    /*
      Với Select thì nó có thuộc tính `selectedOptions` là một mảng chứ 1 phần tử (bởi vì không có chọn nhiều),
      các phần tử này là phần tử được lựa chọn và nó chính là các `option`. Lặp qua mảng này và lấy từ value của
      các options trong đó. Nếu như mình lấy ra được nhiều hơn 1 value thì mình sẽ giữ mảng đó, ngược lại nếu như chỉ
      lấy được 1 value thì bỏ mảng đi và lấy mỗi value đó thôi.
    */
    let values: Array<string | number> | string | number = [];
    let i = 0;
    while(formEle.selectedOptions[i]) {
      values.push(formEle.selectedOptions[0].value);
      i++;
    } 

    if(values.length === 1) values = values[0];

    data.values = values;
    data.elementName = formEle.name;
  }

  if(formEle instanceof RadioNodeList) {
    /*
      Trong HTML Form, thì radio và checkbox khi có cùng value của thuộc tính `name`,
      thì tự động nó được group thành một nhóm và được gom lại trong Object `RadioNodeList`.

      Trong `RadioNodeList` nó chứa các HTMLInputElement, Tuy nhiên thì ngoài ra nó còn có
      một thuộc tính khác là `value`. `value` này chính là value mà mình assign cho radio, và
      radio này chính là radio này được check. Nên là tuỳ vào element trong `RadioNodeList` thì
      mình sẽ có 2 cách lấy value khác nhau.
    */
    if((formEle[0] as HTMLInputElement).type === "radio") {
      data.values = formEle.value;
      data.elementName = (formEle[0] as HTMLInputElement).name;
    } else {
      data.values = [];
      formEle.forEach(ele => {
        let actualEle = (ele as HTMLInputElement);
        if(!data.elementName) data.elementName = actualEle.name;
        if(actualEle.checked) (data.values as Array<string | number>).push(actualEle.value);
      })
    }
  }

  return data;
}

/**
 * Hàm này dùng để setvalue cho form.
 * @param formEle Phần tử của form, có thể là input, radio node list (là các input type = checkbox | radio), ngoài ra cũng có thể là select.
 */
export function setValuesToFormElement(formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement, values: any) {
  if(formEle instanceof HTMLInputElement) {
    formEle.value = values;
  }

  if(formEle instanceof HTMLSelectElement) {
    formEle.value = values;
  }

  if(formEle instanceof RadioNodeList) {
    /*
      Trong HTML Form, thì radio và checkbox khi có cùng value của thuộc tính `name`,
      thì tự động nó được group thành một nhóm và được gom lại trong Object `RadioNodeList`.

      Trong `RadioNodeList` nó chứa các HTMLInputElement, Tuy nhiên thì ngoài ra nó còn có
      một thuộc tính khác là `value`. `value` này chính là value mà mình assign cho radio, và
      radio này chính là radio này được check. Nên là tuỳ vào element trong `RadioNodeList` thì
      mình sẽ có 2 cách lấy value khác nhau.
    */
    if((formEle[0] as HTMLInputElement).type === "radio") {
      formEle.value = values;
    } else {
      formEle.forEach((ele: any) => {
        if(values.includes(ele.value)) ele.checked = true;
      })
    }
  }
}