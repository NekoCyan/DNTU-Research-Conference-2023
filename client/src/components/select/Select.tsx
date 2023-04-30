import React from 'react'

import {
  SelectProps,
  SelectOptionProps
} from 'src/types'

import './SelectStyles.css'

function SelectOption(props: SelectOptionProps) {
  let selectOptionClassName = props.className ? "py-2 px-3" + " " + props.className : "py-2 px-3";
  // selectOptionClassName += " py-2 px-3 border-clr-outline";
  return (
    <option {...props} className={selectOptionClassName}>
      {props.children}
    </option>
  )
}


export default function Select({
 label,
 ...props
}: SelectProps) {
  let selectClassName = props.className ? "select" + " " + props.className : "select";
  selectClassName += " border-clr-outline rounded-8";
  return (
    <>
      {label && <p className='fs-3 mb-1'>{label}</p>}
        <select
          {...props}
          className={selectClassName}
        >
          {props.children}
        </select>
    </>
  )
}

Select.Option = SelectOption;