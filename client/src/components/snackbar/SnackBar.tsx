import React from 'react'

import { useSnackBar } from 'src/hooks/useSnackBar'

import './SnackBarStyles.css'

import { SnackBarDataProps } from 'src/types';

interface SnackBarProps {
 data: SnackBarDataProps,
 onClose: () => void,
 containerClassName?: string
}

export default function SnackBar(props: SnackBarProps) {
  React.useEffect(() => {
    setTimeout(() => {
      console.log("REMOVE SNACK BAR");
      props.onClose();
    }, props.data.duration || 3000 )
  }, [])

  props.data.color = props.data.color ? props.data.color : "info";
  return (
    <div 
      className={
        `snack-bar-container px-3 py-2 rounded-8 ${props.data.color} ${props.containerClassName}`
      }
    >
      <span className={`fw-bold txt-clr-${props.data.color === "info" ? "primary" : props.data.color}`}>{props.data.title}:</span> {props.data.message}
    </div>
  )
}
