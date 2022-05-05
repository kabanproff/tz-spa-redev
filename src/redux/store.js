import { configureStore } from "@reduxjs/toolkit";
import siderReduser from "./reducers/siderSlice";
import userReduser from './reducers/userSlice'

export const store = configureStore({
	reducer: {
		user: userReduser,
		sider: siderReduser,
	}
})