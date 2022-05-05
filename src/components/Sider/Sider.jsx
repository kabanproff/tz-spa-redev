import React from 'react'
import {
	Layout,
	Menu,
	Badge
} from 'antd';
import { BellFilled, TeamOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import Logo from '../Logo/Logo';
import './Sider.less'
import { NavLink } from 'react-router-dom';

const { Sider: AntSider } = Layout;

// const items = [
// 	['Все пользователи', '1', <TeamOutlined />, '/'],
// 	['Модули', '2', <AppstoreOutlined />, 'moduls'],
// 	['Выйти', '3', <LogoutOutlined />, '/autorization']
// ]
const items = [
	[<NavLink to={'/'} >Все пользователи</NavLink>, '1', <TeamOutlined />,],
	[<NavLink to={'moduls'} >Модули</NavLink>, '2', <AppstoreOutlined />,],
	['Выйти', '3', <LogoutOutlined />,]
]

function getItems(icon) {
	return items.map(i => icon ? getItem(...i) : getItem(...i.slice(0, 2)))
}

function getItem(label, key, icon) {
	return {
		label,
		key,
		icon
	}
}

const itemsElseCollapsed = (collapsed) => collapsed ? getItems('icon') : getItems()

const Sider = () => {

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

	const onClick = (e) => {
		console.log(e)
	}

	return (
		<AntSider
			onClick={onClick}
			width={215}
			className='sider'
			collapsible={isBroken}
			breakpoint="lg"
			onCollapse={onCollapse}
			onBreakpoint={onBroken}
		>
			<div className={classNames('sider__block', {
				'block-collapsed': collapsed
			})}>


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
										: [getItems('icon')[2]]
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

		</AntSider>
	)
}

export default Sider