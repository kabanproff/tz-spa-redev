import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = {
	isAdmin: false,
	token: null,
	loading: false,
}

export const getUser = createAsyncThunk(
	'user/getUser',
	async (values, { rejectWithValue, dispatch }) => {
		const { data } = await axios.post('https://typ-back.herokuapp.com/api/auth/login', values)
		dispatch(setUser(data))
		localStorage.setItem('token', data.token);
		localStorage.setItem('isAdmin', data.isAdmin)
	}
)

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			console.log("action", action)
			console.log('state', state)
			state.token = action.payload.token
			state.isAdmin = action.payload.isAdmin

		},
		logout(state) {
			state = initialState
		},
		// isLoading: state
	},
	extraReducers: {
		[getUser.pending]: (state) => { console.log('pending', state.loading); state.loading = true },
		[getUser.fulfilled]: (state, action) => {
			console.log('fulfiled', state.loading);
			state.loading = false;
			console.log('action', action)
		},
		[getUser.rejected]: () => console.log('rejected')

	}
})


export const { setUser, logout } = userSlice.actions



export default userSlice.reducer


