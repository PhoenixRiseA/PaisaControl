import { createSlice } from "@reduxjs/toolkit";

const initialDetailsState = { details: [], complete: "false" };

const detailsSlice = createSlice({
  name: "details",
  initialState: initialDetailsState,
  reducers: {
    loadDetails(state, action) {
      console.log(action.payload);
      state.details = Object.keys(action.payload);
      console.log(state.details);
    },
  },
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice.reducer;
