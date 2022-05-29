import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'

import authReducer from './reducers/userAuthSlice'
import { authApi } from "./reducers/authApi";
import { usersApi } from "./reducers/usersApi";
import { modulesApi } from "./reducers/modulesApi";
import { usersModulesApi } from "./reducers/usersModulesApi";
// import usersSlice from "./reducers/usersSlice";
// console.log(usersApi)
export const store = configureStore({
	reducer: {
		auth: authReducer,
		// users: usersSlice,
		[authApi.reducerPath]: authApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[modulesApi.reducerPath]: modulesApi.reducer,
		[usersModulesApi.reducerPath]: usersModulesApi.reducer

	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware()
		.prepend(
			authApi.middleware,
			usersApi.middleware,
			modulesApi.middleware,
			usersModulesApi.middleware
		)
})

setupListeners(store.dispatch)