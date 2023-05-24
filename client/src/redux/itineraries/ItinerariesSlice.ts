import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'

import {
  generateItineraryAsync,
  getItineraryListAsync,
  getItineraryDetailsAsync,
  deleteItineraryAsync,
  saveItineraryAsync
} from 'src/api'

import { removeFrom } from 'src/utils/functions'

import {
  ItineraryDataProps,
  PromptDataProps
} from 'src/types'

/**
 * Hàm này tính toán việc giảm dữ liệu đi ở một mức nào đó.
 * Tránh việc giảm về quá 0.
 * @param {number} value Số cần giảm
 * @param {number} amount Lượng cần giảm
 * @returns 
 */
function descreaseByAmount(value: number, amount: number) {
  let afterDescrease = value - amount;
  if(afterDescrease >= amount) value -= amount;
  else value = 0;
  return value;
}

// Phương: Khởi tạo giá trị của một Slice trong redux
/**
 * State của Itinerary có cấu trúc như sau:
 * ```ts
 * interface itineraries = {
 *   [key: string]: ItineraryDataProps
 * }
 * ```
 */
const initialState: {
  itineraries: Array<ItineraryDataProps> | null,
  itineraryDetails: ItineraryDataProps | null,
  isGenerating: boolean,
  isGenerated: boolean,
  skip: number,
  limit: number
} = {
  isGenerating: false,
  isGenerated: false,
  itineraries: null,
  itineraryDetails: null,
  skip: 0,
  limit: 20
}

type TypeOfItineraryListFetching = "ADD" | "REFRESH";

// Phương: Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng createAsyncThunk đi kèm với extraReducers
// Phương: https://redux-toolkit.js.org/api/createAsyncThunk
export const fetchItineraryListAPI = createAsyncThunk(
  'itineraries/fetchItineraryListAPI',
  async (type: TypeOfItineraryListFetching, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const { limit, skip } = state.itineraries;
    const response = await getItineraryListAsync({limit, skip});
    console.log("RESPONSE DATA: ", response.data);
    return {type, data: response.data};
  }
)

export const generateItineraryAPI = createAsyncThunk(
  "itineraries/generateItineraryAPI",
  async (data: PromptDataProps, thunkAPI) => {
    console.log("Vui lòng chờ trong giây lát...");
    let response = await generateItineraryAsync(data);
    console.log("Lịch trình đã tạo xong!");
    console.log("RESPONSE DATA: ", response.data);
    return response.data;
  }
);

export const fetchItineraryDetailsAPI = createAsyncThunk(
  "itineraries/fetchItineraryDetailsAPI",
  async (travelId: string) => {
    let response = await getItineraryDetailsAsync(travelId);
    console.log("RESPONSE DATA: ", response.data);
    return response.data;
  }
);

export const deleteItineraryAPI = createAsyncThunk(
  "itineraries/deleteItineraryAPI",
  async (data: string) => {
    let response = await deleteItineraryAsync(data);
    console.log("RESPONSE DATA: ", response.data);
    return response.data;
  }
);
export const savetineraryAPI = createAsyncThunk(
  "itineraries/savetineraryAPI",
  async (data: ItineraryDataProps) => {
    let response = await saveItineraryAsync(data);
    console.log("RESPONSE DATA: ", response.data);
    return response.data;
  }
);

// Phương: Khởi tạo một slice trong redux store
export const ItinerariesSlice = createSlice({
  name: 'itineraries',
  initialState,
  reducers: {
    // Phương: Lưu ý luôn là ở đây cần cặp ngoặc nhọn cho function trong reducer cho dù code bên trong chỉ có 1 dòng, đây là rule của Redux
    // Phương: https:// Phương:redux-toolkit.js.org/usage/immer-reducers#mutating-and-returning-state
    /**
     * Hàm này đùng dể update lịch trình của hành trình du lịch.
     * @param state Toàn bộ state của Itineraries Slice.
     * @param action 
     */
    updateItineraries: (state, action: {type: string, payload: Array<ItineraryDataProps> | undefined}) => {
      const itineraries = action.payload
      state.itineraries = itineraries ? [...itineraries] : null;
    },
    /**
     * Thêm một du lịch trình hành trình du lịch vào danh sách.
     * @param state Toàn bộ state của Itineraries Slice.
     * @param action 
     */
    addToItineraries: (state, action: {type: string, payload: ItineraryDataProps}) => {
      let itinerary = action.payload;
      if(!state.itineraries) state.itineraries = [];
      state.itineraries.push(itinerary);
    },
    /**
     * Bỏ một lịch trình hành trình du lịch khỏi danh sách.
     * @param state Toàn bộ state của Itineraries Slice.
     * @param action 
     */
    removeFromItineraries: (state, action: {type: string, payload: string}) => {
      let id = action.payload;
      if(state.itineraries) {
        state.itineraries = removeFrom<ItineraryDataProps>(state.itineraries, (ele, index) => ele.travelId, id);
      }
    },
    updateItineraryDetails: (state, action: {type: string, payload: ItineraryDataProps}) => {
      let data = action.payload;
      state.itineraryDetails = Object.assign<{}, ItineraryDataProps | null, ItineraryDataProps>(
        {},
        state.itineraryDetails,
        data
      );
    },
    updateItineraryGeneratingStatus: (state, action: {type: string, payload: { isGenerating?: boolean, isGenerated?: boolean }}) => {
      let status = action.payload;
      if(status.isGenerated) state.isGenerated = status.isGenerated;
      if(status.isGenerating) state.isGenerating = status.isGenerating;
    }
  }
  ,
  extraReducers: (builder) => {
    builder.addCase(generateItineraryAPI.pending, (state, action) => {
      state.isGenerating = true;
      state.isGenerated = false;
    });

    builder.addCase(generateItineraryAPI.fulfilled, (state, action) => {
      let data = action.payload;
      state.itineraryDetails = Object.assign<{}, ItineraryDataProps | null, ItineraryDataProps>(
        {},
        state.itineraryDetails,
        { prompt: data.data }
      );
      state.isGenerating = false;
      state.isGenerated = true;
    });

    builder.addCase(fetchItineraryListAPI.fulfilled, (state, action) => {
      let { type, data } = action.payload;
      let itineraryList = data.data;

      if(itineraryList && itineraryList.length === 0) {
        state.skip = descreaseByAmount(
          state.skip,
          state.limit
        )
      }

      if(state.itineraries === null) state.itineraries = [];

      if(type === "ADD") {
        state.itineraries?.push(...itineraryList);
      }

      if(type === "REFRESH") {
        state.itineraries = itineraryList;
      }
    });

    builder.addCase(fetchItineraryDetailsAPI.fulfilled, (state, action) => {
      let itineraryDetails = action.payload.data;
      console.log("Itinerary Details (Before update): ", state.itineraryDetails);
      state.itineraryDetails = {...state.itineraryDetails, ...itineraryDetails};
      console.log("Itinerary Details (After update): ", state.itineraryDetails);
    });

    builder.addCase(savetineraryAPI.fulfilled, (state, action) => {
      let itinerary = action.payload.data;
      state.itineraries?.push(itinerary);
    });

    builder.addCase(deleteItineraryAPI.fulfilled, (state, action) => {
      let itinerary = action.payload.data;
      state.itineraries = removeFrom<ItineraryDataProps>(state.itineraries!, (ele, index) => ele.travelId, itinerary.travelId);
    });
  }
})

// Phương: Action creators are generated for each case reducer function
// Phương: Actions: dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Phương: Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer nhé.
export const { 
  updateItineraries,
  updateItineraryDetails,
  updateItineraryGeneratingStatus,
  addToItineraries,
  removeFromItineraries,
  // Phương
} = ItinerariesSlice.actions

// Phương: Selectors: mục đích là dành cho các components bên dưới gọi bằng useSelector() tới nó để lấy dữ liệu từ trong redux store ra sử dụng
export const itinerariesStateSelector = (state: any): Array<ItineraryDataProps> | null => {
  return state.itineraries.itineraries;
}

export const itineraryDetailsStateSelector = (state: any): ItineraryDataProps | null => {
  return state.itineraries.itineraryDetails; 
}

export const IsGeneratingStateSelector = (state: any): boolean => {
  return state.itineraries.isGenerating;  
}

export const IsGeneratedStateSelector = (state: any): boolean => {
  return state.itineraries.isGenerated;  
}

// Phương: Export default cái ItinerariesReducer của chúng ta để combineReducers trong store
export const itinerariesReducer = ItinerariesSlice.reducer;