import React from "react";

import { ItineraryProps } from "src/types";

import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentItineraries,
  updateCurrentItineraries,
  updateItinerary,
  removeFromItineraries,
  addToItineraries
} from "src/redux/itineraries/ItinerariesSlice";

export function useItineraries() {
  const itineraries = useSelector(selectCurrentItineraries)
  const dispatch = useDispatch()
  // const { itineraries, setItineraries } = React.useContext(AppContext);

  /**
   * Hàm này giúp tìm một thông tin của một lịch trình trong danh sách lịch trình.
   * @param id Id của itinerary. Id này là id của shedule trong MongoDB.
   * @returns 
   */
  const findItinerary = (id: string) => itineraries!.find(itinerary => itinerary._id === id);
  /**
   * Hàm này sẽ add một lịch trình vào trong danh sách lịch trình.
   * @param itinerary Thông tin đầy đủ của một lịch trình.
   * @returns 
   */
  const addItinerary = (itinerary: ItineraryProps) => {
    dispatch(addToItineraries(itinerary))
  }
  /**
   * Hàm này dùng để update một lịch trình nào đó trong danh sách lịch trình.
   * @param itinerary Một phần thông tin của lịch trình.
   * @returns 
   */
  const updateOneItinerary = (id: string, itinerary: ItineraryProps) => {
    dispatch(updateItinerary({id, itinerary}));
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
    dispatch(removeFromItineraries(id))
  }

  return {
    itineraries,
    findItinerary,
    addItinerary,
    updateOneItinerary,
    clearItineraries,
    removeItinerary
  }
}