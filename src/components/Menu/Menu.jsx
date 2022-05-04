import React from 'react'

import './Menu.less'
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const Menu = () => {

	const [visibleItems, setVisibleItems] = React.useState(false)
	const itemRef = React.useRef(null)
	console.log(itemRef)
	const handleClick = (e) => {
		if ([...itemRef.current.firstChild.childNodes].includes(e.target)
			|| itemRef.current.firstChild === e.target
		) {
			setVisibleItems(!visibleItems)
		}
	}


	return (
		<div className={'menu'}>
			<ul className={'menu__list'}>
				<li
					ref={itemRef}
					onClick={(e) => handleClick(e)}
					className={classNames('menu__item', {
						active: visibleItems
					})}>
					<NavLink to={'/'} >
						<div className={'item__block'}>
							<span>Все пользователи</span>
							<i className={'item__arrow'}></i>
						</div>
					</NavLink>
					<ul>
						<li>
							<div className={'item__block'}>
								<span>Динамика студентов</span>
							</div>
						</li>
						<li>
							<div className={'item__block'}>
								<span>Рейтинг благодарности</span>
							</div>
						</li>
					</ul>
				</li>
				<li className={'menu__item'} >
					<NavLink to={'moduls'} >
						<div className={'item__block'}>
							<span>Модули</span>
						</div>
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default Menu