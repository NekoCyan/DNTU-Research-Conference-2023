import React,
{
  InputHTMLAttributes,
  HTMLInputTypeAttribute
} from "react"

export interface UserProps {
  fullname: string,
  email: string,
  username: string,
  userId: string
}

export interface ScheduleProps {
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
  schedules?: {[key: string]: SheduleProps},
  manifold: ManifoldProps
}

export interface AppContextValues {
  user?: UserProps,
  schedules?: {[key: string]: SheduleProps},
  manifold: ManifoldProps,
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>,
  setSchedules: React.Dispatch<React.SetStateAction<{[key: string]: SheduleProps} | undefined>>,
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
  type?: HTMLInputTypeAttribute | 'chip',
}

export interface ResponseData {
  code: number,
  data: any,
  isError: boolean,
  message: string
}

export interface InputDataProps {
  name: string,
  label?: {
    icon?: string,
    text?: string,
    sub?: string,
  },
  type: HTMLInputTypeAttribute | 'chip',
  props?: InputHTMLAttributes<HTMLInputElement>,
  labelInputClassName?: string
}

export interface GroupInputsDataProps {
  isGroup: boolean,
  baseName: string,
  inputs: Array<ChipInputDataProps | TextInputDataProps>
}

export interface GroupChipInputsDataProps extends GroupInputsDataProps {
  isChipGroup: boolean,
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