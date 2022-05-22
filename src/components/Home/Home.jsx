import React from 'react'
import { Layout, Menu, Button, PageHeader, Input, } from 'antd';
import { TeamOutlined, AppstoreOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import Tabl from '../Moduls/Tabl';
import s from './Home.module.less'

import CustomTable from '../Table/Table';
import { Route, Routes } from 'react-router-dom';
import Moduls from '../Moduls/Moduls';
import Sider from '../Sider/Sider';
import AddUser from '../AddUser/containers/AddUser';

const { Header, Content } = Layout;
const { Search } = Input


const items2 = [
	getItem('Студенты', '1'), getItem('Динамика студентов', '2'), getItem('Рейтинг благодарности', '3'),
];

function getItem(label, key, icon) {
	return {
		label, key, icon
	}
}

const Home = () => {
	const [searchVal, setSearchVal] = React.useState('')
	const [visible, setVisible] = React.useState(false)
	const [confirmLoading, setConfirmLoading] = React.useState(false)

	const showModal = () => {
		setVisible(true);
	};
	const onCancel = () => {
		console.log('Clicked cancel button');
		setVisible(false);
	}
	const onChanger = (pagination, filters, sorter) => {
		console.log('Various parameters', pagination, filters, sorter);
	}
	const handleOnChange = (e) => {
		setSearchVal(e.target.value)
		console.log(e.target.value)
	}
	// const getFilter = () => {
	// 	return [val]
	// }
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
						{/* <Header
							className={s.content__header}
						>
							<Menu
								defaultSelectedKeys={['1']}
								className={'header__menu'}
								mode="horizontal"
								items={items2} />
						</Header> */}
						<Content >
							<div className={s.content}>
								<PageHeader
									className="site-page-header"
									title="Таблица пользователей"
									extra={[
										<AddUser
											key="1"
										>Добавить студента</AddUser>,
										<Search
											key="2"
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
// }

export default Home;