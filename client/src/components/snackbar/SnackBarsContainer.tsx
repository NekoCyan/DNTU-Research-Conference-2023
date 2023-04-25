import React from 'react'

import { useSnackBar } from 'src/hooks/useSnackBar'

import SnackBar from './SnackBar';

import './SnackBarStyles.css'

export default function SnackBarsContainer() {
  const { snackBars, removeSnackBar } = useSnackBar();

  const SnackBars = React.useMemo(() => {
    let amountOfSnackBars = snackBars.length;
    return snackBars.map((snackBar, index) => {
      if(index < amountOfSnackBars - 1) {
        return <SnackBar key={snackBar.id} data={snackBar} onClose={() => removeSnackBar(snackBar.id)} containerClassName='mb-1' />
      } else return <SnackBar key={snackBar.id} data={snackBar} onClose={() => removeSnackBar(snackBar.id)} />
    })
  }, [snackBars])

  return (
    <div className='snack-bars-container'>
      {SnackBars}
    </div>
  );
}
