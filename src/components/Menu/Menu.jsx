import React from 'react'

import './Menu.less'
import classNames from 'classnames';
import { Link } from 'react-router-dom';

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
					<Link to={'home'} >
						<div className={'item__block'}>
							<span>Все пользователи</span>
							<i className={'item__arrow'}></i>
						</div>
					</Link>
					<ul>
						<li>
							Динамика студентов
						</li>
						<li>Рейтинг благодарности</li>
					</ul>
				</li>
				<li className={'menu__item'} ><Link to={'moduls'} >Модули</Link> </li>
			</ul>
		</div>
	)
}

export default Menu