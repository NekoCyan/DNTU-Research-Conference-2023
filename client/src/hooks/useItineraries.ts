
import {
  Dispatch
} from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import {
  itinerariesStateSelector,
  itineraryDetailsStateSelector,
  IsGeneratingStateSelector,
  IsGeneratedStateSelector,
  updateItineraries,
  updateItineraryDetails,
  updateItineraryGeneratingStatus,
  removeFromItineraries,
  addToItineraries,
  fetchItineraryListAPI,
  generateItineraryAPI,
  fetchItineraryDetailsAPI,
  savetineraryAPI,
  deleteItineraryAPI
} from "src/redux/itineraries/ItinerariesSlice";

import {
  ItineraryDataProps,
  PromptDataProps
} from "src/types";

export function useItineraries() {
  const itineraries = useSelector(itinerariesStateSelector);
  const dispatch = useDispatch();
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
  const addItinerary = (itinerary: ItineraryDataProps) => {
    dispatch(addToItineraries(itinerary));
  }
  /**
   * Hàm này dùng để clear danh sách lịch trình.
   * @returns 
   */
  const clearItineraries = () => dispatch(updateItineraries());
  /**
   * Hàm này dùng để clear một lịch trình nào đó trong danh sách.
   * @param id Id của lịch trình.
   * @returns 
   */
  const removeItinerary = (id: string) => {
    dispatch(removeFromItineraries(id));
  }
  /**
   * Hàm này dùng để lấy dữ liệu về danh sách lịch trình.
   * @returns 
   */
  const fetchItineraryList = () => dispatch<any>(fetchItineraryListAPI("ADD"));
  /**
   * Hàm này dùng để refresh lại danh sách lịch trình 
   * @returns 
   */
  const refreshItineraryList = () => dispatch<any>(fetchItineraryListAPI("REFRESH"));

  return {
    itineraries,
    findItinerary,
    addItinerary,
    clearItineraries,
    removeItinerary,
    fetchItineraryList,
    refreshItineraryList
  }
}

export const {
  useItineraryDetails,
  useItineraryDetailsState,
  useItineraryDetailsActions
} = (function() {
  let createItineraryDetailsActions = (dispatch: Dispatch<any>) => ({
    /**
     * Hàm này dùng để tạo lịch trình và lưu nó lại vào trong Itineraries Slice.
     * @param data Dữ liệu của prompt từ Form theo dạng là Object.
     */
    generateItinerary: function(data: PromptDataProps) {
      dispatch(generateItineraryAPI(data));
    },
    /**
     * Hàm này dùng để cập nhật chi tiết một hành trình du lịch.
     * @param data Dữ liệu của hành trình
     */
    updateItineraryDetails: function(data: ItineraryDataProps) {
      dispatch(updateItineraryDetails(data));
    },
    /**
     * Hàm này dùng để cập nhật status của việc tạo lịch trình.
     */
    updateItineraryGeneratingStatus: function(status: {isGenerated?: boolean, isGenerating?: boolean}) {
      dispatch(updateItineraryGeneratingStatus(status));
    },
    /**
     * Hàm này dùng để lấy dữ liệu chi tiết của Itinerary từ server.
     * @param travelId Id của Itinerary.
     */
    fetchItineraryDetails: function(travelId: string) {
      dispatch(fetchItineraryDetailsAPI(travelId));
    },
    /**
     * Hàm này dùng để lưu lịch trình về database.
     * @param data Dữ liệu đầy đủ của một lịch trình.
     */
    savetinerary: function(data: ItineraryDataProps) {
      dispatch(savetineraryAPI(data));
    },
    /**
     * 
     * @param travelId Id của Itinerary.
     */
    deleteItinerary: function(travelId: string) {
      dispatch(deleteItineraryAPI(travelId));
    }
  })

  return {
    useItineraryDetails: function() {
      let itineraryDetails = useSelector(itineraryDetailsStateSelector);
      let isGenerating = useSelector(IsGeneratingStateSelector);
      let isGenerated = useSelector(IsGeneratedStateSelector);
      let dispatch = useDispatch();

      let actions = createItineraryDetailsActions(dispatch);

      return {
        itineraryDetails,
        isGenerating,
        isGenerated,
        ...actions
      }
    },

    useItineraryDetailsActions: function() {
      let dispatch = useDispatch();

      let actions = createItineraryDetailsActions(dispatch);

      return actions;
    },

    useItineraryDetailsState: function() {
      let itineraryDetails = useSelector(itineraryDetailsStateSelector);
      let isGenerating = useSelector(IsGeneratingStateSelector);
      let isGenerated = useSelector(IsGeneratedStateSelector);

      return {
        itineraryDetails,
        isGenerating,
        isGenerated
      };
    }
  }
})();