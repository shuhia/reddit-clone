import { createSlice } from "@reduxjs/toolkit";

export const redditSlice = createSlice({
  name: "reddit",
  initialState: {
    value: 0,
  },
  reducers: {
    getPosts: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getPosts } = redditSlice.actions;

export default redditSlice.reducer;
