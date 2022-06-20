import { emptySplitApi } from "./emptySplitApi"

export const usersModulesApi = emptySplitApi.injectEndpoints({
	reducerPath: 'usersModulesApi',
	tagTypes: ['UsersModulesApi'],
	endpoints: (build) => ({
		getUserModule: build.query({
			async queryFn({ id }, _queryApi, _extraOptions, fetchWithBQ) {
				const modulesRes = await fetchWithBQ(`usersModules/${id}`)
				if (modulesRes.error) throw modulesRes.error
				const moduleId = modulesRes?.data[0]?.module_id
				const module = moduleId ? await fetchWithBQ(`modules/${moduleId}`) : { data: null }
				return module.data ? { data: module.data } : { error: module.error }
			},
			providesTags: (results) => {
				return [
					'UsersModulesApi',
					[{ type: 'UsersModulesApi', id: results?.id && null }]
				]
			}
		}),
		getUsersModules: build.query({
			query: () => `usersModules`
		})
	})
})

export const {
	useGetUserModuleQuery,
	useGetUsersModulesQuery
} = usersModulesApi