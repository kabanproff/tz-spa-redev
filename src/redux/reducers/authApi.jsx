import { emptySplitApi } from "./emptySplitApi";

export const authApi = emptySplitApi.injectEndpoints({
	endpoints: (build) => ({
		authUser: build.mutation({
			query: (body) => {
				return {
					url: 'auth/login',
					method: 'POST',
					body
				}
			},
		})
	})
})

export const { useAuthUserMutation } = authApi