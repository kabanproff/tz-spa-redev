import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuth: !!localStorage.getItem('token'),
}

export const userAuthSlice = createSlice({
	name: 'userAuth',
	initialState,
	reducers: {
		setUserAuth(state, action) {
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('isAdmin', action.payload.isAdmin)
			state.isAuth = !!action.payload.token
		},
		logout(state) {
			localStorage.clear()
			state.isAuth = false
		}
	}
})

export const { setUserAuth, logout } = userAuthSlice.actions

export default userAuthSlice.reducer


