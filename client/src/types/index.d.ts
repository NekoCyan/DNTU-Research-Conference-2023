import React,
{
  InputHTMLAttributes,
  HTMLInputTypeAttribute,
  SelectHTMLAttributes,
  OptionHTMLAttributes
} from "react"

export interface UserProps {
  fullname: string,
  email: string,
  username: string,
  userId: string
}

export interface ItineraryProps {
  _id?: string,
  name?: string,
  color?: string,
  content?: string,
}

export interface ManifoldProps {
  isLogin?: boolean,
  isSplashVisible?: boolean,
}

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

export interface SnackBarDataProps {
  id: string,
  title?: string;
  message?: string;
  color?: "error" | "success" | "warning" | "info";
  duration?: number;
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
  children: Array<JSX.Element> | JSX.Element
}

export interface ModalItemProps {
  name: string,
  component: () => JSX.Element | Array<JSX.Element>,
  type: "left-side" | "rigt-side" | "dialog" | "snack-bar"
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | (() => JSX.Element) | JSX.Element,
  labelInputClassName?: string,
  type?: HTMLInputTypeAttribute | 'chip' | 'radio-chip',
}

export interface SelectOptionProps extends OptionHTMLAttributes<HTMLOptionElement> {}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: JSX.Element | string,
  children: JSX.Element | Array<JSX.Element>
}

export interface ResponseData {
  code: number,
  data: any,
  isError: boolean,
  message: string
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
  props?: InputHTMLAttributes<HTMLInputElement>,
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