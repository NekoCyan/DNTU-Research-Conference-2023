import React from "react";

import {
  AppContextValues,
  UserProps,
  ScheduleProps,
  ManifoldProps
} from 'src/types'

/*
  AppContext là context giữ những phần dữ liệu chính của ứng dụng, bao gồm
  dữ liệu của người dùng, dữ liệu về lịch trình. Ngoài ra thì có thể còn chứa
  nhiều thông tin khác hơn nữa.
*/

export const AppContext = React.createContext<AppContextValues>({
  user: undefined,
  schedules: undefined,
  manifold: {
    isSplashVisible: true,
    isLogin: false
  },
  setManifold: () => {},
  setSchedules: () => {},
  setUser: () => {}
});

let childrenRef: any;
let valueRef: any;
let userRef: any;
let schedulesRef: any;
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
  const [schedules, setSchedules] = React.useState<ScheduleProps | undefined>(undefined);
  const [manifold, setManifold] = React.useState<ManifoldProps>({
    isSplashVisible: true,
    isLogin: false
  });

  // if(!userRef) userRef = user
  // if(!schedulesRef) schedulesRef = schedules
  // if(!manifoldRef) manifoldRef = manifold

  let value: AppContextValues = React.useMemo(() => ({
    user,
    schedules,
    manifold,
    setUser,
    setSchedules,
    setManifold
  }), [user, schedules, manifold]);

  // if(!valueRef) valueRef = value;
  // console.log("MANIFOLD: ", manifold);
  // console.log("USER: ", user);
  // console.log("COMPARE USER: ", userRef === user);
  // console.log("COMPARE SCHEDULES: ", schedulesRef === schedules);
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