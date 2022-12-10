import { createSlice } from "@reduxjs/toolkit";
import { IAddWebsiteSlice } from "../types";

const AddWebsiteSlice = createSlice({
  name: "addwebsite",
  initialState: {
    urladdloading: false,
    urladdresult: null,
    urladderror: null,
    websitelist: null,
    websitelistloading: false,
    websitelisterror: null,
    websitepage: 0,
    websitelimit: 8,
    websitestotal: 0
  } as IAddWebsiteSlice,
  reducers: {
    addUrl: (state, action) => {
      state.urladdloading = true
      state.urladdresult = ''
    },
    addUrlSuccess: (state, action) => {
      state.urladdloading = false
      state.urladdresult = action?.payload
    },
    addUrlFailed: (state, action) =>  {
      state.urladdloading = false
      state.urladderror = action?.payload
    },
    getWebsiteList: (state, action) => {
      state.websitelistloading = true
      state.websitelist = null
      state.websitepage = action?.payload?.page
      state.websitelimit = action?.payload?.limit
      state.websitestotal = action?.payload?.total
    },
    getWebsiteListSuccess: (state, action) => {
      state.websitelistloading = false
      state.websitelist = action?.payload?.data
      state.websitestotal = action?.payload?.total
    },
    getWebsiteListFailed: (state, action) => {
      state.websitelistloading = false
      state.websitelisterror = action?.payload
    }
  }
})

export default AddWebsiteSlice.reducer;

export const {
  addUrl,
  addUrlFailed,
  addUrlSuccess,
  getWebsiteList,
  getWebsiteListFailed,
  getWebsiteListSuccess
} = AddWebsiteSlice.actions;