import { configureStore } from "@reduxjs/toolkit";

import userReduser from './reducers/userAuthSlice'
import { usersApi } from "./reducers/usersApi";
import usersSlice from "./reducers/usersSlice";
// console.log(usersApi)
export const store = configureStore({
	reducer: {
		user: userReduser,
		users: usersSlice,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
})