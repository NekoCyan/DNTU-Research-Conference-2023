import React from 'react'

import { AppContext } from 'src/contexts/AppContext'

/**
 * 
 */
export function useSplash() {
  const { manifold, setManifold } = React.useContext(AppContext);
  const { isSplashVisible } = manifold;

  /**
   * Hàm này dùng để show Splash
   */
  const showSplash = () => {
    if(!isSplashVisible) setManifold(prevManifold => ({...prevManifold, isSplashVisible: true}))
  }
  /**
   * Hàm này dùng để hide Splash
   */
  const hideSplash = () => {
    if(isSplashVisible) setManifold(prevManifold => ({...prevManifold, isSplashVisible: false}))
  }

  return {
    isSplashVisible,
    showSplash,
    hideSplash,
  }
}