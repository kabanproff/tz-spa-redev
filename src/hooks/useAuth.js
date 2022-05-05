import { useSelector } from "react-redux"

export function useAuth() {
	const {
		// isAdmin,
		//  token,
		loading } = useSelector(state => state.user)
	const token = localStorage.getItem('token')
	return {
		isAdmin: localStorage.getItem('isAdmin'),
		token,
		isAuth: !!token,
		loading,
	}
} 