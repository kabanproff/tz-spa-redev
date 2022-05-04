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
import { BellFilled, TeamOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';



import './Home.less'
import Logo from '../Logo/Logo';
import Menus from '../Menu/Menu';
import CustomTable from '../Table/Table';
import { Route, Routes } from 'react-router-dom';
import Moduls from '../Moduls/Module';
import classNames from 'classnames';

const { Header, Content, Footer, Sider } = Layout;

function getItems(label, key, icon) {
	// debugger
	return items.map(i => icon ? getItem(...i) : getItem(...i.slice(0, 2)))
}

function getItem(label, key, icon) {
	return {
		label, key, icon
	}
}

const itemsElseCollapsed = (collapsed) => collapsed ? getItems('label', 'key', 'icon') : getItems('label', 'key')


// const items = [
// 	getItem('Все пользователи', 'sub', null, [getItem('Динамика студентов', 's1'), getItem('Рейтинг благодарности', 's2')]),
// 	getItem('Модули', '2'),
// ];
const items2 = [
	getItem('Студенты', '1'), getItem('Динамика студентов', '2'), getItem('Рейтинг благодарности', '3'),
];

const items = [
	['Все пользователи', '1', <TeamOutlined />],
	['Модули', '2', <AppstoreOutlined />],
	['Выйти', '3', <LogoutOutlined />]
]

const Home = () => {

	const [collapsed, setCollapsed] = React.useState(false)
	const [isBroken, setIsBroken] = React.useState(false)


	const onCollapse = (collapsed, type) => {
		console.log(collapsed, type);
		setCollapsed(collapsed);
	};
	const onBroken = (broken) => {
		console.log('broken', broken);
		setIsBroken(broken)
	}
	console.log(!collapsed ? getItems('label', 'key', 'icon')[2] : getItems('label', 'key')[2])
	console.log(collapsed ? getItems('label', 'key', 'icon')[2] : getItems('label', 'key')[2])
	console.log(itemsElseCollapsed(collapsed))
	console.log(items)
	return (
		<Layout
			style={{
				// minHeight: '100%',
				height: '100%'
			}}
		// hasSider
		>
			<Sider
				// style={{
				// 	overflow: 'auto',
				// 	height: '100vh',
				// 	position: 'abso',
				// 	left: 0,
				// 	top: 0,
				// 	bottom: 0,
				// }}
				width={215}
				className='sider'
				collapsible={isBroken}
				breakpoint="lg"
				onCollapse={onCollapse}
				onBreakpoint={onBroken}
			>
				<div className='sider__block'>


					{
						!collapsed &&
						<header className="sider__header">
							<div className={'logo'}>
								<Logo color={'white'} />
							</div>
							<Badge count={5} size={'small'} offset={[-7, 7]} >
								<BellFilled style={{ fontSize: '22px', color: 'white', width: '32px', height: '27px' }} />
							</Badge>
						</header>}

					<div className="sider__menus">
						{
							Array(2).fill(null).map((item, key) => {
								console.log('key', key, key === 0)
								return <Menu
									key={key}
									items={
										key === 0 ? itemsElseCollapsed(collapsed).slice(0, -1)
											: [getItems('label', 'key', 'icon')[2]]
									}
									className={classNames('menu', {
										'menu-collapsed': collapsed && key === 0
									})}
									defaultSelectedKeys={key === 0 && ['1']}
								/>
							}
							)
						}

					</div>
				</div>

			</Sider>
			<Routes>
				<Route index element={

					<Layout
						className="content__layout"
					// style={{
					// 	marginLeft: 200,
					// }}
					>
						<Header
							className="content__header"
						>
							<Menu
								defaultSelectedKeys={['1']}
								className={'header__menu'}
								mode="horizontal"
								items={items2} />
						</Header>
						<Content
						// style={{
						// 	overflow: 'initial',
						// }}
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