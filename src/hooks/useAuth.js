import { useSelector } from "react-redux"

export function useAuth() {
	const { isAuth } = useSelector(state => state.auth)
	const token = localStorage.getItem('token')
	console.log('this token', token)
	return {
		isAdmin: localStorage.getItem('isAdmin'),
		token,
		isAuth
	}
} 