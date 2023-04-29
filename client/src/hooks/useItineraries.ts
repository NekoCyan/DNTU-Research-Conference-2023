import React from "react";

import { ItineraryProps } from "src/types";

import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentItineraries, updateCurrentItineraries } from "src/redux/itineraries/ItinerariesSlice";

export function useItineraries() {
  const itineraries = useSelector(selectCurrentItineraries)
  const dispatch = useDispatch()
  // const { itineraries, setItineraries } = React.useContext(AppContext);

  /**
   * Hàm này giúp tìm một thông tin của một lịch trình trong danh sách lịch trình.
   * @param id Id của itinerary. Id này là id của shedule trong MongoDB.
   * @returns 
   */
  const findItinerary = (id: string) => itineraries![id];
  /**
   * Hàm này sẽ add một lịch trình vào trong danh sách lịch trình.
   * @param itinerary Thông tin đầy đủ của một lịch trình.
   * @returns 
   */
  const addItinerary = (itinerary: ItineraryProps) => {
    if(itineraries![itinerary._id!]) return;
    let cpItineraries = Object.assign({}, itineraries);
    cpItineraries[itinerary._id!] = itinerary;
    dispatch(updateCurrentItineraries({...cpItineraries}))
  }
  /**
   * Hàm này dùng để update một lịch trình nào đó trong danh sách lịch trình.
   * @param itinerary Một phần thông tin của lịch trình.
   * @returns 
   */
  const updateShedule = (itinerary: ItineraryProps) => {
    if(itineraries![itinerary._id!]) return;
    let cpItineraries = Object.assign({}, itineraries);
    cpItineraries[itinerary._id!] = Object.assign(cpItineraries[itinerary._id!], itinerary);
    dispatch(updateCurrentItineraries({...cpItineraries}))
  }
  /**
   * Hàm này dùng để clear danh sách lịch trình.
   * @returns 
   */
  const clearItineraries = () => dispatch(updateCurrentItineraries(null));
  /**
   * Hàm này dùng để clear một lịch trình nào đó trong danh sách.
   * @param id Id của lịch trình.
   * @returns 
   */
  const removeItinerary = (id: string) => {
    if(itineraries![id]) return;
    let cpItineraries = Object.assign({}, itineraries);
    delete cpItineraries[id];
    dispatch(updateCurrentItineraries({...cpItineraries}))
  }

  return {
    itineraries,
    findItinerary,
    addItinerary,
    updateShedule,
    clearItineraries,
    removeItinerary
  }
}