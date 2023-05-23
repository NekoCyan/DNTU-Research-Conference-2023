import React,
{
  InputHTMLAttributes,
  HTMLInputTypeAttribute,
  SelectHTMLAttributes,
  OptionHTMLAttributes
} from "react"

/*
  Phần này là type của Redux state (Bao gồm User, Manifold, Itinerary)
*/
export interface UserDataProps {
  fullname: string,
  email: string,
  username: string,
  userId: string
}

export interface ItineraryDataProps {
  _id?: string,
  itineraryName?: string,
  color?: string,
  prompt?: string,
  promptAsObj?: PromptDataProps
}

export interface ManifoldDataProps {
  isLogin?: boolean,
  isSplashVisible?: boolean,
}

/*
  Phần này là type của các context, bao gồm data và values của context.
  Có 2 context là App và Modal. (Có thể sau này sẽ đổi)
*/
export interface AppContextDataProps {
  user?: UserProps,
  itineraries?: {[key: string]: SheduleProps},
  manifold: ManifoldProps
}

export interface AppContextValues {
  user?: UserProps,
  itineraries?: {[key: string]: SheduleProps},
  manifold: ManifoldProps,
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>,
  setItineraries: React.Dispatch<React.SetStateAction<{[key: string]: SheduleProps} | undefined>>,
  setManifold: React.Dispatch<React.SetStateAction<ManifoldProps>>
}

export interface ModalContextProps {
  currentItemName: string,
  hasDarkBG: boolean,
  // Vì snack bar là một trường hợp đặc biệt cho nên nó sẽ có dữ liệu riêng. Nó được dùng để thông báo.
  snackBars: Array<SnackBarDataProps>,
  items: { [key: string]: JSX.Element }
}

export interface ModalContextValues {
  data: ModalContextProps,
  setData: React.Dispatch<React.SetStateAction<ModalContextProps>>
}

export interface ModalProps {
  items?: {
    [key: string]: {
      component: () => JSX.Element,
      type: ModalItemType,
      options: ModalItemOptionsDataProps
    }
  }
}

export type ModalItemType = "left-side" | "right-side" | "dialog" | "snack-bar";

export interface ModalItemResult {
  message?: string,
  result: boolean,
  data?: any
}

export interface ModalItemOptionsDataProps {
  hasDarkBG?: boolean
}

export type ModalItemCloseAction = (result: boolean = true, message?: string, data?: any) => Promise<boolean>

export interface ModalItemDataProps {
  component: () => JSX.Element,
  close: ModalItemCloseAction,
  type: ModalItemType,
  options?: ModalItemOptionsDataProps
}

export interface ModalItemProps {
  component: () => JSX.Element,
  name: string,
  type: ModalItemType
}

export interface DialogPartProps<T> {
  close: ModalItemCloseAction,
  data?: T
}
export type DialogPart = (props: DialogPartProps<T>) => JSX.Element;

export interface DialogProps {
  name: string,
  header?: DialogPart,
  footer?: DialogPart,
  body?: DialogPart,
  title?: string
}

/*
  Dữ liệu của các Object.
*/
export interface SnackBarDataProps {
  id: string,
  title?: string;
  message?: string;
  color?: "error" | "success" | "warning" | "info";
  duration?: number;
}

export interface ResponseDataProps<T> {
  code: number,
  data: T,
  isError: boolean,
  message: string
}

export interface ResquestBodyDataProps<T> {
  data: T
}

interface Object {
  [key: string]: any
}

export interface PromptDataProps extends Object {
  destination?: string,
  budget?: string,
  duration?: number,
  interests?: Array<string>,
  accomodation?: string,
  travelWith?: string,
  moveByVehicle?: string,
  activities?: Array<string>,
  cuisines?: Array<string>,
  language?: string
}

export interface SaveItineraryDataProps extends Object {
  saveItineraryName: string,
  saveItineraryColor?: string
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | (() => JSX.Element) | JSX.Element,
  labelInputClassName?: string,
  type?: HTMLInputTypeAttribute | 'chip' | 'radio-chip',
}

export interface InputChipProps extends InputProps {
  nonPadding?: boolean;
  shape?: 'circle' | 'rounded-4' | 'rounded-8' | 'rounded-12'
}

export interface SelectOptionProps extends OptionHTMLAttributes<HTMLOptionElement> {}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: JSX.Element | string,
  children: JSX.Element | Array<JSX.Element>
}

export interface FormElementValuesProps {
  elementName?: string,
  values?: string | number| Array<string | number>
}

export interface FormElementDataProps {
  elementType: "input" | "chip" | "select" | "group-input" | "group-chip-input" | "group-select"
}

export interface FormElementLabelDataProps {
  icon?: string,
  text?: string,
  sub?: string,
}

export interface InputDataProps extends FormElementDataProps {
  name: string,
  label?: FormElementLabelDataProps,
  type: HTMLInputTypeAttribute | 'chip' | 'radio-chip',
  props?: InputProps,
  labelInputClassName?: string
}

export interface GroupInputsDataProps extends FormElementDataProps {
  baseName: string,
  inputs: Array<ChipInputDataProps | TextInputDataProps>
}

export interface GroupChipInputsDataProps extends GroupInputsDataProps {
  groupChipLabel: string,
  inputs: Array<ChipInputDataProps>
}

export interface ChipInputDataProps extends InputDataProps {
  value: string,
  props?: InputChipProps
}

export interface TextInputDataProps extends InputDataProps {
  validate?: {
    pattern?: RegExp,
    errorMessage?: string
  },
}

export interface SelectOptionDataProps {
  label: string | JSX.Element,
  name: string,
  value: string,
  props?: OptionHTMLAttributes<HTMLOptionElement>
}

export interface SelectDataProps extends FormElementDataProps {
  label: FormElementLabelDataProps,
  name: string,
  options: Array<SelectOptionDataProps>,
  containerClassName?: string,
  props?: SelectHTMLAttributes<HTMLSelectElement>
}

export interface GroupSelectDataProps extends FormElementDataProps {
  baseName: string,
  selects: Array<SelectDataProps>
}