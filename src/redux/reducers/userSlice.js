import { createSlice } from "@reduxjs/toolkit"


const initialState = {
	isAdmin: false,
	token: null
}
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state = action.payload
		},
		logout(state) {
			state = initialState
		}
	},

})


export const { setUser, logout } = userSlice.actions



export default userSlice.reducer


