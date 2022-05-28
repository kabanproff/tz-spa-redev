import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
	isAuth: !!localStorage.getItem('token'),
	// loading: false
}

// export const getUserAuth = createAsyncThunk(
// 	'user/authUser',
// 	async (values, { dispatch }) => {
// 		const { data } = await axios.post('https://typ-back.herokuapp.com/api/auth/login', values)
// 		dispatch(setUserAuth(data))

// 	}
// )

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
		},

	},
	// extraReducers: {
	// 	[getUserAuth.pending]: (state) => {
	// 		state.loading = true
	// 	},
	// 	[getUserAuth.fulfilled]: (state) => {
	// 		state.loading = false
	// 	},
	// 	[getUserAuth.rejected]: (e) => { console.log('rejected', e) }

	// }
})


export const { setUserAuth, logout } = userAuthSlice.actions



export default userAuthSlice.reducer


