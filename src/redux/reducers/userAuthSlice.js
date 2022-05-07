import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
	loading: false,
	isAuth: !!localStorage.getItem('token')
}

export const getUser = createAsyncThunk(
	'user/authUser',
	async (values, { dispatch }) => {
		const { data } = await axios.post('https://typ-back.herokuapp.com/api/auth/login', values)
		dispatch(setUser(data))

	}
)

export const userSlice = createSlice({
	name: 'userAuth',
	initialState,
	reducers: {

		setUser(state, action) {
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
		[getUser.pending]: (state) => {
			state.loading = true
		},
		[getUser.fulfilled]: (state, action) => {
			state.loading = false
		},
		[getUser.rejected]: (e) => { console.log('rejected', e) }

	}
})


export const { setUser, logout } = userSlice.actions



export default userSlice.reducer


