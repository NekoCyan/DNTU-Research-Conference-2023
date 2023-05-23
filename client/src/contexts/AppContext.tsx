import React from "react";

import {
  AppContextValues,
  UserProps,
  ItineraryProps,
  ManifoldProps
} from 'src/types'

/*
  AppContext là context giữ những phần dữ liệu chính của ứng dụng, bao gồm
  dữ liệu của người dùng, dữ liệu về lịch trình. Ngoài ra thì có thể còn chứa
  nhiều thông tin khác hơn nữa.
*/

export const AppContext = React.createContext<AppContextValues>({
  user: undefined,
  itineraries: undefined,
  manifold: {
    isSplashVisible: true,
    isLogin: false
  },
  setManifold: () => {},
  setItineraries: () => {},
  setUser: () => {}
});

let childrenRef: any;
let valueRef: any;
let userRef: any;
let itinerarysRef: any;
let manifoldRef: any;

/**
 * __Provider__
 * 
 * AppProvider cho phép truy cập vào các thuộc tính của AppContext
 * và có thể dùng được các hook mà Provider này cung cấp.
 * @returns 
 */
export function AppProvider({
  children
}:{
  children: JSX.Element | Array<JSX.Element> | null
}) {
  if(!childrenRef) childrenRef = children;

  const [user, setUser] = React.useState<UserProps | undefined>(undefined);
  const [itineraries, setItineraries] = React.useState<ItineraryProps | undefined>(undefined);
  const [manifold, setManifold] = React.useState<ManifoldProps>({
    isSplashVisible: true,
    isLogin: false
  });

  // if(!userRef) userRef = user
  // if(!itinerarysRef) itinerarysRef = itineraries
  // if(!manifoldRef) manifoldRef = manifold

  let value: AppContextValues = React.useMemo(() => ({
    user,
    itineraries,
    manifold,
    setUser,
    setItineraries,
    setManifold
  }), [user, itineraries, manifold]);

  // if(!valueRef) valueRef = value;
  // console.log("MANIFOLD: ", manifold);
  // console.log("USER: ", user);
  // console.log("COMPARE USER: ", userRef === user);
  // console.log("COMPARE SCHEDULES: ", itinerarysRef === itineraries);
  // console.log("COMPARE MANIFOLD: ", manifoldRef === manifold);
  // console.log("COMPARE CHILDREN: ", childrenRef === children);
  // console.log("COMPARE VALUE: ", valueRef === value);
  // console.log("CONTEXT");

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}