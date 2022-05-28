import { emptySplitApi } from "./emptySplitApi"

export const modulesApi = emptySplitApi.injectEndpoints({
	reducerPath: 'modulesApi',
	tagTypes: ['Modules'],
	endpoints: (build) => ({
		getModules: build.query({
			query: () => 'modules'
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

		})
	}),
	overrideExisting: false,//конечная точка будет просто переопределена
})

export const { useAddModuleMutation } = modulesApi