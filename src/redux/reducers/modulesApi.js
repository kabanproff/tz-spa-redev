import { emptySplitApi } from "./emptySplitApi"

export const modulesApi = emptySplitApi.injectEndpoints({
	reducerPath: 'modulesApi',
	tagTypes: ['Modules'],
	endpoints: (build) => ({
		getModules: build.query({
			query: () => 'modules',
			providesTags: (results) => [
				'Modules',
				...results.map(({ id }) => ({ type: 'Modules', id }))
			]
		}),
		getModulesId: build.query({
			query: (id) => `modules/${id}`,
			providesTags: (results) => [
				'Modules',
				...results.map(({ id }) => ({ type: 'Modules', id }))
			]
		}),
		addModule: build.mutation({
			query: (module) => {
				return {
					url: 'modules',
					method: 'POST',
					body: module
				}
			},
			invalidatesTags: ['Modules']

		}),
		editModule: build.mutation({
			query: ({ module, id }) => {
				console.log(module, id)
				return {
					url: `modules/${id}`,
					method: 'PUT',
					body: module
				}
			},
			invalidatesTags: ['Modules']
		}),
		deleteModule: build.mutation({
			query: (id) => ({
				url: `modules/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Modules']
		}),
	}),
	overrideExisting: false,
})

export const {
	useGetModulesQuery,
	useAddModuleMutation,
	useGetModulesIdQuery,
	useEditModuleMutation,
	useDeleteModuleMutation
} = modulesApi