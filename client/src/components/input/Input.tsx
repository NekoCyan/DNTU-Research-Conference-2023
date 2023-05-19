import React from 'react'

import { deepCompare } from 'src/utils/functions';

import {
  InputProps,
  InputChipProps,
  ChipInputDataProps
} from 'src/types'

import './InputStyles.css'

function I__Chip({
  label,
  labelInputClassName,
  ...props
}: InputChipProps,
ref: React.ForwardedRef<HTMLInputElement>
) {
  props.className = "input-chip";
  let type = props.type === "chip" ? "checkbox" : props.type === "radio-chip" ? "radio" : "";
  if(type === "") {
    console.log("Chip must be have specific type: chip or radio-chip");
    return null;
  }

  let checkClassName = 'input-chip-check'
  // Extended Props
  if(props.nonPadding) checkClassName += " " + 'non-padding';
  if(props.shape) checkClassName += " " + props.shape;
  else checkClassName += " " + "rounded-4";

  // Đến bước này thì xoá đi bởi vì không thể add nó vào thẻ html được.
  delete props.nonPadding;
  delete props.shape;

  return (
    <label className={`label-input-chip${labelInputClassName ? " " + labelInputClassName : ""}`}>
      <input ref={ref} {...props} type={type} />
      <span className={checkClassName}>
        {
          label
          && typeof label === 'function'
          && label()
        }
        {
          label
          && typeof (label === 'string' || React.isValidElement(label))
          && (label as JSX.Element | string)
        }
      </span>
    </label>
  )
}

function I__Option({
  label,
  labelInputClassName,
  ...props
}: InputProps,
ref: React.ForwardedRef<HTMLInputElement>
) {
  let labelTextClassName = "fs-3 ms-1";
  return (
    <label className={`label-input-option${labelInputClassName ? " " + labelInputClassName : ""}`}>
      <input ref={ref} {...props} />
      {
        label
        && typeof label === 'function'
        && label()
      }
      {
        label
        && typeof (label === 'string' || React.isValidElement(label))
        && <span className={labelTextClassName}>{label as JSX.Element | string}</span>
      }
    </label>
  )
}

function I__Border({
  label,
  labelInputClassName,
  ...props
}: InputProps,
ref: React.ForwardedRef<HTMLInputElement>
) {
  props.className = "input";
  let labelTextClassName = "mb-1 fs-3";
  return (
    <label className={`label-input${labelInputClassName ? " " + labelInputClassName : ""}`}>
      {
        label
        && typeof label === 'function'
        && label()
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

const InputWithTextField = React.forwardRef(I__Border);
const InputOption = React.forwardRef(I__Option);
const InputChip = React.forwardRef(I__Chip);

function I__({
  label,
  labelInputClassName,
  ...props
}: InputProps,
ref: React.ForwardedRef<HTMLInputElement>
) {
  switch(props.type) {
    case 'chip':
    case 'radio-chip': {
      return <InputChip label={label} labelInputClassName={labelInputClassName} {...props} ref={ref} />
    };

    case 'checkbox':
    case 'radio': {
      return <InputOption label={label} labelInputClassName={labelInputClassName} {...props} ref={ref} />
    };

    case 'button':
    case 'reset':
    case 'submit':
    case 'range':
    case 'color':
    case 'image':
    case 'hidden': {
      return (
        <input ref={ref} {...props} />
      )
    };

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