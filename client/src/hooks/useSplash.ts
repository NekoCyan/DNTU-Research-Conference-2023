import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectIsSplashVisibleState, updateIsSplashVisibleState } from 'src/redux/manifold/ManifoldSlice'

/**
 * 
 */
export function useSplash() {
  const isSplashVisible = useSelector(selectIsSplashVisibleState)
  const dispatch = useDispatch()

  /**
   * Hàm này dùng để show Splash
   */
  const showSplash = () => {
    dispatch(updateIsSplashVisibleState(true))
  }
  /**
   * Hàm này dùng để hide Splash
   */
  const hideSplash = () => {
    console.log("CAN HIDE SPLASH: ", isSplashVisible);
    dispatch(updateIsSplashVisibleState(false))
  }

  return {
    isSplashVisible,
    showSplash,
    hideSplash,
  }
}