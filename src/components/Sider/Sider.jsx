import React from 'react'
import Logo from '../Logo/Logo';
import classNames from 'classnames';
import { Layout, Menu, Badge } from 'antd';
import { BellFilled, TeamOutlined, AppstoreOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/userAuthSlice';

import './Sider.less'

const { Sider: AntSider } = Layout;

const items = [
	{ label: <NavLink to={'/'} >Все пользователи</NavLink>, key: '1', icon: <TeamOutlined /> },
	{ label: <NavLink to={'moduls'} >Модули</NavLink>, key: '2', icon: <AppstoreOutlined /> },
	{ label: 'Выйти', key: '3', icon: <LogoutOutlined /> },
]


const Sider = () => {
	const [collapsed, setCollapsed] = React.useState(false)
	const [isBroken, setIsBroken] = React.useState(false)
	const dispatch = useDispatch()

	const onCollapse = (collapsed) => {
		setCollapsed(collapsed);
	};

	const onBroken = (broken) => {
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
			breakpoint={'lg'}
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
						)}
					/>
				</div>
			</div>
		</AntSider>
	)
}

export default Sider