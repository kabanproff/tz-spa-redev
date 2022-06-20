import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://typ-back.herokuapp.com/api/',
	}),
	endpoints: () => ({}),
})