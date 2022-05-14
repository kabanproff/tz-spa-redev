import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
	reducerPath: 'usersApi',
	// tagTypes: ['UsersFull'],
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
					const numberModule = arrayPromiseModulesId.find( i =>i?.data[0]?.user_id === user.id)?.data[0].module_id// ищем номер модуля
					console.log(numberModule)
					
					const {data:module} = numberModule ? await fetchWithBQ(`modules/${numberModule}`):{data:null}
					return {
					...user,
					key: user.id, //нужен для уникальности поля, иначе warning 
					module: module // добавляем наш объект модуль, хотя лучше наверно сделать по другому через Promise.all и заново перебрать по id
					}
				})
				const users = await Promise.all(usersAddModuleId)
				return { data: users }
			}	
		}),
		getModules: build.query({
			query: () => 'modules'
		})
	})
})


export const {
	useGetUsersFullQuery,
	useGetUsersQuery,
	useGetModulesQuery
} = usersApi


// const usersAddModuls = await Promise.all(data.map(i=> fetchWithBQ(`modules/${i.module_id[0]}`)))
				
				// return { data: data }
				// console.log('data',data)
				// const arrayPromise = await Promise.all(data.map(i => fetchWithBQ(`usersModules/${i.id}`)))
				// console.log(arrayPromise)
				// const result = data.map(user => ({
				// 	...user,
				// 	key: user.id,
				// 	module_id: arrayPromise.reduce((pr, i) => {
				// 		if (i?.data[0]?.user_id === user.id) pr.push(i.data[0].module_id)
				// 		return pr
				// 	}, []),

					
					// moduls:
					// {
					// if (i?.data[0]?.user_id === user.id) {
						// console.log(user, i)
						// return i.data[0].module_id
						// }
					

				// }))
				
				// window.armod = arrayPromise
				// window.ardata = data
				// return { data: [data, arrayPromise] }
				// return { data: arrayPromise }
				// const val = await Promise.all(arrayPromise)
				// console.log(res)
				// return new Promise((res, rej) => {
				// 	res(val)
				// })