import React from 'react'
import { Card, Badge, Space } from 'antd'
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import s from './ModuleCart.module.less'
const { Meta } = Card;



const ModuleCart = ({ title, color }) => {
	return (
		<Badge.Ribbon
			className={s.budge}
			style={{ background: color, color: color }}
		>
			<Card
				headStyle={{
					border: 0,
					paddingTop: "7px"
				}}
				className={s.card}
				title={title}
			>
				<Meta
					className={s.meta}
					description={<Space><EditOutlined /><CloseOutlined /></Space>}
				/>
			</Card>
		</Badge.Ribbon>

	)
}

export default ModuleCart