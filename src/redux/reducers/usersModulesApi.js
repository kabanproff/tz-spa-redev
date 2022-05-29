import { emptySplitApi } from "./emptySplitApi"

export const usersModulesApi = emptySplitApi.injectEndpoints({
	reducerPath: 'usersModulesApi',
	tagTypes: ['UsersModulesApi'],
	endpoints: (build) => ({
		// getUserModule: build.query({
		// 	query: (id) => `usersModules/${id}`,
		// 	async onQueryStarted(_arg, queryApi,) {
		// 		console.log(_arg, queryApi,)
		// 		try {
		// 			const { data: mid } = await queryApi.queryFulfilled;
		// 			const { data } = queryApi.dispatch(emptySplitApi.useGetModulesIdQuery(mid[0].module_id))
		// 		} catch (e) {
		// 			console.error('exampleApi createExample error', e);
		// 		}
		// 	}
		// getUserModule: build.query({
		// 	query: (id) => `usersModules/${id}`

		// 	providesTags: (results) => {
		// 		console.log(results)
		// 		return [
		// 			'UsersModulesApi',
		// 			results.map(({ id }) => ({ type: 'UsersModulesApi', id }))
		// 		]
		// 	}
		// })
		getUserModule: build.query({
			async queryFn({ id }, _queryApi, _extraOptions, fetchWithBQ) {
				const stst = _queryApi.getState()
				// console.log('idarg', _queryApi, _extraOptions, fetchWithBQ, stst)
				const modulesRes = await fetchWithBQ(`usersModules/${id}`)
				if (modulesRes.error) throw modulesRes.error
				const moduleId = modulesRes?.data[0]?.module_id
				// stst.provided
				const module = moduleId ? await fetchWithBQ(`modules/${moduleId}`) : { data: null }
				// console.log('modulesRes', modulesRes, moduleId, module)
				return module.data ? { data: module.data } : { error: module.error }
			},
			providesTags: (results) => {
				// console.log('results', results)
				return [
					'UsersModulesApi',
					[{ type: 'UsersModulesApi', id: results?.id && null }]
				]
			}
		}),
		// getUsersFilterModules: build.query({
		// 	async queryFn(filteredValue, _queryApi, _extraOptions, fetchWithBQ) {
		// 		const usersModuleId = await Promise.all(users.map(i=> fetchWithBQ(`usersModules/${i.id}`)))
		// 		const findUsersModule = users.map(async user=>{
		// 			const module = usersModuleId.find(i=>i.user_id === user.id)
		// 			return await fetchWithBQ(`modules/${module.module_id}`)
		// 		})
		// 	}
		// })
		getUsersModules: build.query({
			query: () => `usersModules`
		})


	})
	// overrideExisting: false,//конечная точка будет просто переопределена
})

export const {
	useGetUserModuleQuery,
	useGetUsersModulesQuery
} = usersModulesApi