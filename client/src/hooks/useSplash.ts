import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentManifold, updateCurrentManifold } from 'src/redux/manifold/ManifoldSlice'

/**
 * 
 */
export function useSplash() {
  const manifold = useSelector(selectCurrentManifold)
  const dispatch = useDispatch()
  const { isSplashVisible } = manifold;

  /**
   * Hàm này dùng để show Splash
   */
  const showSplash = () => {
    if(!isSplashVisible) 
      dispatch(updateCurrentManifold({
        ...manifold,
        isSplashVisible: true
      }))
  }
  /**
   * Hàm này dùng để hide Splash
   */
  const hideSplash = () => {
    if(isSplashVisible)
      dispatch(updateCurrentManifold({
        ...manifold,
        isSplashVisible: false
      }))
  }

  return {
    isSplashVisible,
    showSplash,
    hideSplash,
  }
}