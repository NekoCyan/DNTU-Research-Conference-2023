import React from 'react'

import { deepCompare } from 'src/utils/functions';

import {
  InputProps
} from 'src/types'

import './InputStyles.css'

function I__WithTextField({
  label,
  labelInputClassName,
  ...props
}: InputProps,
ref: React.ForwardedRef<HTMLInputElement>
) {
  props.className = "input";
  let labelTextClassName = "mb-1 fw-bold fs-2";

  return (
    <label className={`label-input${labelInputClassName ? " " + labelInputClassName : ""}`}>
      {
        label
        && typeof label === 'function'
        && <span className={labelTextClassName}>{label()}</span>
      }
      {
        label
        && typeof (label === 'string' || React.isValidElement(label))
        && <span className={labelTextClassName}>{label as JSX.Element | string}</span>
      }
      <div className='input-container rounded-8 border-clr-outline'>
        <input ref={ref} {...props} />
      </div>
    </label>
  )
}

const InputWithTextField = React.forwardRef(I__WithTextField);

function I__({
  label,
  labelInputClassName,
  ...props
}: InputProps,
ref: React.ForwardedRef<HTMLInputElement>
) {
  switch(props.type) {
    case 'text':
    case 'number':
    case 'password':
    case 'email':
    case 'search':
    case 'tel':
    case 'url':
    default: return <InputWithTextField label={label} labelInputClassName={labelInputClassName} {...props} ref={ref} />
  }
}

const Input = React.forwardRef(I__)

export default Input;