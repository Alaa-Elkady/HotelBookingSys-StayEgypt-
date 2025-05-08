import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: null,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuestInfo: (state, action) => {
      state.guest = action.payload;
      localStorage.setItem("guestInfo", JSON.stringify(action.payload));
    },
    logoutGuest: (state) => {
      state.guest = null;
      localStorage.removeItem("guestInfo");
    },
  },
});

export const { setGuestInfo, logoutGuest } = guestSlice.actions;
export default guestSlice.reducer;
