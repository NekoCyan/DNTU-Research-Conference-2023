import React from "react";

import {
  SheduleProps,
  AppContextProps,
  AppContextValues,
  UserProps
} from 'src/types'

/*
  AppContext là context giữ những phần dữ liệu chính của ứng dụng, bao gồm
  dữ liệu của người dùng, dữ liệu về lịch trình. Ngoài ra thì có thể còn chứa
  nhiều thông tin khác hơn nữa.
*/

export const AppContext = React.createContext<AppContextValues>({
  data: {
    user: undefined,
    schedules: undefined
  },
  setData: () => {}
});

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
  const [data, setData] = React.useState<AppContextProps>({
    user: undefined,
    schedules: undefined
  });

  return (
    <AppContext.Provider value={{data, setData}}>
      {children}
    </AppContext.Provider>
  )
}

/**
 * __Custom Hook__
 * 
 * Hook này dùng để access vào `user` trong AppContext.
 * @returns 
 */
export function useUser() {
  const { data, setData } = React.useContext(AppContext);
  const { user } = data;

  /**
   * Hàm này dùng để update thông tin cho `user`.
   * @returns
   */
  const updateUser = (newUser: UserProps) => setData({...data, user: Object.assign({}, user, newUser) });
  /**
   * Hàm này nhận vào thông tin của user, và gán thông tin này cho `user`.
   * @param newUser Thông tin mới của người dùng.
   * @returns 
   */
  const setUser = (newUser: UserProps) => setData({...data, user: newUser });
  /**
   * Hàm này dùng để clear `user`.
   * @returns
   */
  const clearUser = () => setData({...data, user: undefined});

  return {
    user,
    updateUser,
    setUser,
    clearUser
  }
}

export function useSchedules() {
  const { data, setData } = React.useContext(AppContext);
  const { schedules } = data;

  /**
   * Hàm này giúp tìm một thông tin của một lịch trình trong danh sách lịch trình.
   * @param id Id của schedule. Id này là id của shedule trong MongoDB.
   * @returns 
   */
  const findSchedule = (id: string) => schedules![id];
  /**
   * Hàm này sẽ add một lịch trình vào trong danh sách lịch trình.
   * @param schedule Thông tin đầy đủ của một lịch trình.
   * @returns 
   */
  const addSchedule = (schedule: SheduleProps) => {
    if(schedules![schedule._id!]) return;
    let cpSchedules = Object.assign({}, schedules);
    cpSchedules[schedule._id!] = schedule;
    setData({...data, schedules: {...cpSchedules}});
  }
  /**
   * Hàm này dùng để update một lịch trình nào đó trong danh sách lịch trình.
   * @param schedule Một phần thông tin của lịch trình.
   * @returns 
   */
  const updateShedule = (schedule: SheduleProps) => {
    if(schedules![schedule._id!]) return;
    let cpSchedules = Object.assign({}, schedules);
    cpSchedules[schedule._id!] = Object.assign(cpSchedules[schedule._id!], schedule);
    setData({...data, schedules: {...cpSchedules}});
  }
  /**
   * Hàm này dùng để clear danh sách lịch trình.
   * @returns 
   */
  const clearSchedules = () => setData({...data, schedules: undefined});
  /**
   * Hàm này dùng để clear một lịch trình nào đó trong danh sách.
   * @param id Id của lịch trình.
   * @returns 
   */
  const removeSchedule = (id: string) => {
    if(schedules![id]) return;
    let cpSchedules = Object.assign({}, schedules);
    delete cpSchedules[id];
    setData({...data, schedules: {...cpSchedules}});
  }

  return {
    schedules,
    findSchedule,
    addSchedule,
    updateShedule,
    clearSchedules,
    removeSchedule
  }
}