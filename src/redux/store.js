import { configureStore } from "@reduxjs/toolkit";

import userReduser from './reducers/userAuthSlice'
import { usersApi } from "./reducers/usersApi";
// console.log(usersApi)
export const store = configureStore({
	reducer: {
		user: userReduser,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
})