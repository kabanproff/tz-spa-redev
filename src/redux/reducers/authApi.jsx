import { emptySplitApi } from "./emptySplitApi";

export const authApi = emptySplitApi.injectEndpoints({
	// reducerPath: 'authApi',
	endpoints: (build) => ({
		authUser: build.mutation({
			query: (body) => {
				return {
					url: 'auth/login',
					method: 'POST',
					body
				}
			},
			// invalidatesTags: ['Auth'] 
		})
	})
})

export const { useAuthUserMutation } = authApi