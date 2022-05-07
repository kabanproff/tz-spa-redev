import { useSelector } from "react-redux"

export function useAuth() {
	const { loading } = useSelector(state => state.user)
	const token = localStorage.getItem('token')
	console.log('this token', token)
	return {
		isAdmin: localStorage.getItem('isAdmin'),
		token,
		isAuth: !!token,
		loading,
	}
} 