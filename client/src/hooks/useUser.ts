import React from "react";

import { AppContext } from "src/contexts/AppContext";

import { UserProps } from "src/types";

/**
 * __Custom Hook__
 * 
 * Hook này dùng để access vào `user` trong AppContext.
 * @returns 
 */
export function useUser() {
  const { user, setUser } = React.useContext(AppContext);

  /**
   * Hàm này dùng để update thông tin cho `user`.
   * @returns
   */
  const updateUser = (newUser: UserProps) => setUser({...user, ...newUser});
  /**
   * Hàm này nhận vào thông tin của user, và gán thông tin này cho `user`.
   * @param newUser Thông tin mới của người dùng.
   * @returns 
   */
  const setNewUser = (newUser: UserProps) => setUser({...newUser});
  /**
   * Hàm này dùng để clear `user`.
   * @returns
   */
  const clearUser = () => setUser(undefined);

  return {
    user,
    updateUser,
    setNewUser,
    clearUser
  }
}