import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
	loading: false,
	isAuth: !!localStorage.getItem('token')
}

export const getUserAuth = createAsyncThunk(
	'user/authUser',
	async (values, { dispatch }) => {
		const { data } = await axios.post('https://typ-back.herokuapp.com/api/auth/login', values)
		dispatch(setUserAuth(data))

	}
)

export const userSlice = createSlice({
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
	extraReducers: {
		[getUserAuth.pending]: (state) => {
			state.loading = true
		},
		[getUserAuth.fulfilled]: (state) => {
			state.loading = false
		},
		[getUserAuth.rejected]: (e) => { console.log('rejected', e) }

	}
})


export const { setUserAuth, logout } = userSlice.actions



export default userSlice.reducer


