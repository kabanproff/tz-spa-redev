import { useSelector } from "react-redux"

export function useAuth() {
	const { isAdmin, token, loading } = useSelector(state => state.user)
	return {
		isAdmin,
		isAuth: !!token,
		loading,
		token
	}
} 