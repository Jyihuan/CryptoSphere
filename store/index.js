import { configureStore } from "@reduxjs/toolkit";

import holderReducer from "./reducer/holdingReducer";
import userReducer from "./reducer/userReducer";

export default configureStore({
  reducer: {
    holderReducer,
    userReducer,
  },
});
