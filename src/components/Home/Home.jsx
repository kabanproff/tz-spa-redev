import React from 'react'

import {
	Layout,
	Menu,
	Breadcrumb,
	Badge,
	Button,
	PageHeader,
	Input
} from 'antd';
import { BellFilled } from '@ant-design/icons';



import './Home.less'
import Logo from '../Logo/Logo';
import Menus from '../Menu/Menu';
import CustomTable from '../Table/Table';
import { Route, Routes } from 'react-router-dom';
import Moduls from '../Moduls/Module';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
	getItem('Все пользователи', 'sub', null, [getItem('Динамика студентов', 's1'), getItem('Рейтинг благодарности', 's2')]),
	getItem('Модули', '2'),
];
const items2 = [
	getItem('Студенты', '1'), getItem('Динамика студентов', '2'), getItem('Рейтинг благодарности', '3'),
];

const Home = () => {

	const [collapsed, setCollapsed] = React.useState(false)


	const onCollapse = (collapsed, type) => {
		console.log(collapsed, type);
		setCollapsed(collapsed);
	};

	console.log(items)
	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<Sider
				width={214}
				className='sider'
				// collapsible
				// trigger={!collapsed && null}
				breakpoint="lg"
				// collapsedWidth="0"
				// collapsed={collapsed}
				onCollapse={onCollapse}
				onBreakpoint={broken => {
					console.log('broken', broken);
					// broken && collapsible
				}}

			>
				<header className="sider__header">
					<div className={'logo'}>
						<Logo color={'white'} />
					</div>
					<Badge count={5} size={'small'} offset={[-7, 7]} >
						<BellFilled style={{ fontSize: '22px', color: 'white', width: '32px', height: '27px' }} />
					</Badge>
				</header>

				<Menus />
			</Sider>
			<Routes>
				<Route index element={

					<Layout
						className="site-layout"
					>
						<Header
							className="nav-header"
						>
							<Menu defaultSelectedKeys={['1']}
								className={'sider-menu'}
								mode="horizontal"
								items={items2} />
						</Header>
						<Content

						>
							<div className={'content'}>
								<PageHeader
									className="site-page-header"
									title="Таблица пользователей"
									extra={[
										<Button key="1" type="primary">
											Добавить студента
										</Button>,
										<Input key="2" />,
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