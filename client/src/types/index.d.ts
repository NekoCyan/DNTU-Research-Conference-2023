import React,
{
  InputHTMLAttributes
} from "react"

export interface UserProps {
  fullName: string
}

export interface SheduleProps {
  _id?: string,
  name?: string,
  color?: string,
  content?: string,
}

export interface AppContextProps {
  user?: UserProps,
  schedules?: {[key: string]: SheduleProps}
}

export interface AppContextValues {
  data: AppContextProps,
  setData: React.Dispatch<React.SetStateAction<AppContextProps>>
}

export interface ModalContextProps {
  currentItemName: string,
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
  component: () => JSX.Element,
  type: "left-side" | "rigt-side" | "dialog"
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | (() => JSX.Element) | JSX.Element,
  labelInputClassName?: string
}