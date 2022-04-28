export const setUserAC = (data) => {
	return {
		type: 'SET_USER',
		payload: data
	}
}

export const logoutAC = () => ({ type: 'LOGOUT' })