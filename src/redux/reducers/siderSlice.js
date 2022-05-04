import { createSlice } from "@reduxjs/toolkit";

import { BellFilled, TeamOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';


// function getItems(label, key, icon) {
// 	return items.map(i => icon ? getItem(...i) : getItem(...i.slice(0, 2)))
// }

function getItem(label, key, icon) {
	return {
		label, key, icon
	}
}

const itemsElseCollapsed = (collapsed) => collapsed ? getItems('label', 'key', 'icon') : getItems('label', 'key')


const initialState = [
	['Все пользователи', '1', <TeamOutlined />],
	['Модули', '2', <AppstoreOutlined />],
	['Выйти', '3', <LogoutOutlined />]
]

export const siderSlice = createSlice({
	name: 'sider',
	initialState,
	redusers: {
		// getItem(state,{payload}){
		// 	return {
		// 		label, key, icon
		// 	}
		// },
		getItems(state, { icon }) {
			return state.map(i => icon ? getItem(...i) : getItem(...i.slice(0, 2)))
		}
	}
})

export const { getUser } = siderSlice.actions

export default siderSlice.reducer