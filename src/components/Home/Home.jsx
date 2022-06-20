import React from 'react'
import { Layout, PageHeader, Input } from 'antd';
import CustomTable from '../Table/Table';
import { Route, Routes } from 'react-router-dom';
import Moduls from '../Moduls/Moduls';
import Sider from '../Sider/Sider';
import AddUser from '../AddUser/containers/AddUser';

import s from './Home.module.less'

const { Content } = Layout;
const { Search } = Input;

const Home = () => {
	const [searchVal, setSearchVal] = React.useState('')

	const handleOnChange = (e) => {
		setSearchVal(e.target.value)
	}

	return (
		<Layout
			style={{ height: '100%' }}
		>
			<Sider />
			<Routes>
				<Route index element={
					<Layout>
						<Content >
							<div className={s.content}>
								<PageHeader
									className={'site-page-header'}
									title={'Таблица пользователей'}
									extra={[
										<AddUser
											key={'1'}
										>Добавить студента</AddUser>,
										<Search
											key={'2'}
											placeholder={'Поиск'}
											onChange={handleOnChange}
										/>,
									]}
								/>
								<CustomTable
									searchVal={searchVal.split(' ')}
								/>
							</div>
						</Content>
					</Layout>
				} />
				<Route path={'moduls'} element={<Moduls />} />
			</Routes>
		</Layout >
	);
}

export default Home;