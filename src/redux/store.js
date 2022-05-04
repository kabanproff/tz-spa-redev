import { configureStore } from "@reduxjs/toolkit";

import userReduser from './reducers/userSlice'

export const store = configureStore({
	reducer: {
		user: userReduser
	}
})