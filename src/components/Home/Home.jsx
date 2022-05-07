import React from 'react'
import { Layout, Menu, Button, PageHeader, Input } from 'antd';
import { TeamOutlined, AppstoreOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';

import s from './Home.module.less'

import CustomTable from '../Table/Table';
import { Route, Routes } from 'react-router-dom';
import Moduls from '../Moduls/Moduls';
import Sider from '../Sider/Sider';

const { Header, Content } = Layout;


const items2 = [
	getItem('Студенты', '1'), getItem('Динамика студентов', '2'), getItem('Рейтинг благодарности', '3'),
];

function getItem(label, key, icon) {
	return {
		label, key, icon
	}
}

const Home = () => {

	return (
		<Layout
			style={{
				height: '100%'
			}}

		>
			<Sider />
			<Routes>
				<Route index element={

					<Layout>
						<Header
							className={s.content__header}
						>
							<Menu
								defaultSelectedKeys={['1']}
								className={'header__menu'}
								mode="horizontal"
								items={items2} />
						</Header>
						<Content >
							<div className={s.content}>
								<PageHeader
									className="site-page-header"
									title="Таблица пользователей"
									extra={[
										<Button key="1" type="primary">
											Добавить студента
										</Button>,
										<Input key="2" placeholder={'Поиск'} suffix={<SearchOutlined />} />,
									]}
								/>
								<CustomTable />
							</div>
						</Content>
					</Layout>

				} />
				<Route path={'moduls'} element={<Moduls />} />
			</Routes>

		</Layout >
	);
}
// }

export default Home;