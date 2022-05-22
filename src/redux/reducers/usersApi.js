import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
	reducerPath: 'usersApi',
	tagTypes: ['Users'],
	baseQuery: fetchBaseQuery({ baseUrl: 'https://typ-back.herokuapp.com/api/' }),
	endpoints: (build) => ({
		getUsersFull: build.query({
			query: () => 'users/full',
			// transformResponse: (response, a, aa) => {
			// 	console.log(a, aa)
			// 	return response
			// 		.map(i => ({ ...i, key: i.id }))
			// }


		}),

		getUsers: build.query({
			async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
				// debugger
				const { data } = await fetchWithBQ('users/full')
				const arrayPromiseModulesId = await Promise.all(data.map(i => fetchWithBQ(`usersModules/${i.id}`)))
				console.log(arrayPromiseModulesId)
				const usersAddModuleId = data.map(async user => {
					const numberModule = arrayPromiseModulesId.find(i => i?.data[0]?.user_id === user.id)?.data[0].module_id// ищем номер модуля
					// console.log('number module', numberModule, 'y', user)

					const { data: module } = numberModule ? await fetchWithBQ(`modules/${numberModule}`) : { data: null }
					return {
						...user,
						key: user.id, //нужен для уникальности поля, иначе warning 
						module: module // добавляем наш объект модуль, хотя лучше наверно сделать по другому через Promise.all и заново перебрать по id
					}
				})
				const users = await Promise.all(usersAddModuleId)
				return { data: users }
			},
			providesTags: (results) => [
				'Users',
				...results.map(({ id }) => ({ type: 'Users', id }))
			]
		}),
		getModules: build.query({
			query: () => 'modules'
		}),
		editUser: build.mutation({
			query: (user, id) => {
				console.log(user.id, id, user)
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
				console.log('req', user)
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
	// useGetUsersFullQuery,
	useGetUsersQuery,
	useGetModulesQuery,
	useEditUserMutation,
	useAddUserMutation
} = usersApi

