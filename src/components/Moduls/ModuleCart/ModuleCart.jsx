import React from 'react'
import { Card } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons';

import s from './ModuleCart.module.less'


const ModuleCart = ({ title }) => {
	return (
		<div className={s.cart}>
			<div className={s.cart__title}>
				<h3>{title}</h3>
				<span></span>
			</div>
			<div className={s.cart__body}></div>
			<div className={s.cart__footer}>
				<span><EditOutlined /><CloseOutlined /></span>
			</div>
		</div>
	)
}

export default ModuleCart