import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
	reducerPath: 'usersApi',
	// tagTypes: ['UsersFull'],
	baseQuery: fetchBaseQuery({ baseUrl: 'https://typ-back.herokuapp.com/api/' }),
	endpoints: (build) => ({
		getUsersFull: build.query({
			query: () => 'users/full',
			transformResponse: (response) => response
				.map(i => ({ ...i, key: i.id }))


		}),

	})
})

export const {
	useGetUsersFullQuery
} = usersApi