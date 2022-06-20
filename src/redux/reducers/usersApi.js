import { emptySplitApi } from "./emptySplitApi"

export const usersApi = emptySplitApi.injectEndpoints({
	reducerPath: 'usersApi',
	tagTypes: ['Users'],
	endpoints: (build) => ({
		getUsersFull: build.query({
			query: () => 'users/full',
			transformResponse: (response) => {
				return response
					.map(i => ({ ...i, key: i.id }))
			},
			providesTags: (res) => [...res.map(({ id }) => ({ type: 'Users', id }))]
		}),
		editUser: build.mutation({
			query: (user) => {
				return {
					url: `users/${user.id}`,
					method: 'PUT',
					body: user
				}
			},
			invalidatesTags: ['Users']
		}),
		addUser: build.mutation({
			query: (user) => {
				return {
					url: 'users/register',
					method: 'POST',
					body: user
				}
			},
			invalidatesTags: ['Users']
		})
	})
})

export const {
	useGetUsersFullQuery,
	useEditUserMutation,
	useAddUserMutation
} = usersApi

