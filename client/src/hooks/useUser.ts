import React from "react";

import { UserProps } from "src/types";
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, updateCurrentUser } from "src/redux/user/userSlice";
/**
 * __Custom Hook__
 * 
 * Hook này dùng để access vào `user` trong AppContext.
 * @returns 
 */
export function useUser() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  // const { user, setUser } = React.useContext(AppContext);

  /**
   * Hàm này dùng để update thông tin cho `user`.
   * @returns
   */
  const updateUser = (newUser: UserProps) => dispatch(updateCurrentUser(newUser));
  /**
   * Hàm này dùng để clear `user`.
   * @returns
   */
  const clearUser = () => dispatch(updateCurrentUser(null));

  return {
    user,
    updateUser,
    clearUser
  }
}