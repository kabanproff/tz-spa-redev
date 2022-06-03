import React from 'react'
import { Layout, Menu, Badge } from 'antd';
import { BellFilled, TeamOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import Logo from '../Logo/Logo';
import './Sider.less'
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/reducers/userAuthSlice';
import { useAuth } from '../../hooks/useAuth';
const { Sider: AntSider } = Layout;

// const items = [
// 	[<NavLink to={'/'} >Все пользователи</NavLink>, '1', <TeamOutlined />,],
// 	[<NavLink to={'moduls'} >Модули</NavLink>, '2', <AppstoreOutlined />,],
// 	['Выйти', '3', <LogoutOutlined />,]
// ]


const Sider = () => {

	const [items, setItems] = React.useState(
		[
			// [<NavLink to={'/'} >Все пользователи</NavLink>, '1', <TeamOutlined />,],
			// [<NavLink to={'moduls'} >Модули</NavLink>, '2', <AppstoreOutlined />,],
			// ['Выйти', '3', <LogoutOutlined />,]
			{ label: <NavLink to={'/'} >Все пользователи</NavLink>, key: '1', icon: <TeamOutlined /> },
			{ label: <NavLink to={'moduls'} >Модули</NavLink>, key: '2', icon: <AppstoreOutlined /> },
			{ label: 'Выйти', key: '3', icon: <LogoutOutlined /> },
		]
	)
	const [collapsed, setCollapsed] = React.useState(false)
	const [isBroken, setIsBroken] = React.useState(false)
	// const { isAuth } = useAuth()
	const dispatch = useDispatch()

	// React.useEffect(() => {
	// if (collapsed) setItems(itemsElseCollapsed(collapsed))

	// }, [collapsed])

	// function getItems(icon) {
	// 	return items.map(i => icon ? getItem(...i) : getItem(...i.slice(0, 2)))
	// }

	// function getItem(label, key, icon) {
	// 	return {
	// 		label,
	// 		key,
	// 		icon,
	// 	}
	// }

	// const itemsElseCollapsed = (collapsed) => collapsed ? getItems('icon') : getItems()


	// console.log('isAuth', isAuth)
	const onCollapse = (collapsed, type) => {
		// console.log(collapsed, type);
		setCollapsed(collapsed);
	};

	const onBroken = (broken) => {
		// console.log('broken', broken);
		setIsBroken(broken)
	}

	const onClick = (e) => {
		e.key === '3' && dispatch(logout())
	}



	return (
		<AntSider

			width={215}
			className={'sider'}
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
					<header className={'sider__header'}>
						<div className={'logo'}>
							<Logo color={'white'} />
						</div>
						<Badge count={5} size={'small'} offset={[-7, 7]} >
							<BellFilled style={{ fontSize: '22px', color: 'white', width: '32px', height: '27px' }} />
						</Badge>
					</header>}

				<div className={'sider__menus'}>
					<Menu
						items={items}
						onClick={onClick}
						defaultSelectedKeys={['1']}
						className={classNames('menu',
							{
								'menu-collapsed': collapsed
							}
						)
						}

					/>
					{
						// Array(2).fill(null).map((_, key) => {
						// 	return <Menu
						// 		key={key}
						// 		onClick={onClick}
						// 		// onSelect={onClick}
						// 		items={
						// 			key === 0 ? itemsElseCollapsed(collapsed).slice(0, -1)
						// 				: [getItems('icon')[2]]
						// 		}
						// 		className={classNames('menu', {
						// 			'menu-collapsed': collapsed && key === 0
						// 		})}
						// 		defaultSelectedKeys={key === 0 && ['1']}
						// 	/>
						// }
						// )
					}

				</div>
			</div>

		</AntSider>
	)
}

export default Sider