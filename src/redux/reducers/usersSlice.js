import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";


export const getUsersFullData = createAsyncThunk(
	'users/getUsersFullData',
	async (_, { dispatch }) => {
		const { data } = await usersApi.useGetUsersFullQuery()

		console.log('dataasynckThunk', data)
		return data
		// const { data2 } = Promise.all(
		// 	data.map(i => usersApi.endpoints.getUser(i.id))
		// )
		// console.log(data2)
	}
)


const initialState = {
	users: []
}


export const usersSlice = createSlice({
	name: 'users',
	initialState,
	// reducers: {

	// 	setUserAuth(state, action) {
	// 		localStorage.setItem('token', action.payload.token);
	// 		localStorage.setItem('isAdmin', action.payload.isAdmin)
	// 		state.isAuth = !!action.payload.token

	// 	},
	// 	logout(state) {
	// 		localStorage.clear()
	// 		state.isAuth = false
	// 	},

	// },
	extraReducers: {
		[getUsersFullData.pending]: (state) => {
			console.log('load')
		},
		[getUsersFullData.fulfilled]: (state) => {
			console.log('ful')
		},
		[getUsersFullData.rejected]: (e) => { console.log('rejected getusers', e) }

	}
})


// export const { setUserAuth, logout } = usersSlice.actions



export default usersSlice.reducer