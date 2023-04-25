import React from "react";

import { AppContext } from "src/contexts/AppContext";

import { ScheduleProps } from "src/types";

export function useSchedules() {
  const { schedules, setSchedules } = React.useContext(AppContext);

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
  const addSchedule = (schedule: ScheduleProps) => {
    if(schedules![schedule._id!]) return;
    let cpSchedules = Object.assign({}, schedules);
    cpSchedules[schedule._id!] = schedule;
    setSchedules({...cpSchedules});
  }
  /**
   * Hàm này dùng để update một lịch trình nào đó trong danh sách lịch trình.
   * @param schedule Một phần thông tin của lịch trình.
   * @returns 
   */
  const updateShedule = (schedule: ScheduleProps) => {
    if(schedules![schedule._id!]) return;
    let cpSchedules = Object.assign({}, schedules);
    cpSchedules[schedule._id!] = Object.assign(cpSchedules[schedule._id!], schedule);
    setSchedules({...cpSchedules});
  }
  /**
   * Hàm này dùng để clear danh sách lịch trình.
   * @returns 
   */
  const clearSchedules = () => setSchedules(undefined);
  /**
   * Hàm này dùng để clear một lịch trình nào đó trong danh sách.
   * @param id Id của lịch trình.
   * @returns 
   */
  const removeSchedule = (id: string) => {
    if(schedules![id]) return;
    let cpSchedules = Object.assign({}, schedules);
    delete cpSchedules[id];
    setSchedules({...cpSchedules});
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