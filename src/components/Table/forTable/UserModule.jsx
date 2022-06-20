import React from 'react'
import { Tag, Spin } from 'antd'
import { useGetUserModuleQuery } from '../../../redux/reducers/usersModulesApi'
import { LoadingOutlined } from '@ant-design/icons';


const UserModule = (id) => {
	const { data: module, isLoading } = useGetUserModuleQuery(id)
	const { color = '#fff', title = '' } = module ?? {}

	const moduleColor = color === '#0000FF' ?
		'blue' : color === '#FFFF00' ?
			'purple' : color === '#EEDF78' ?
				'grey' : color === '#CA8463' ?
					'orange' : color === '#B0CC8A' ?
						'green' : color
	return <>
		{
			!isLoading ? (
				<Tag color={moduleColor} key={id}>
					{title}
				</Tag>
			) : (
				<Spin indicator={<LoadingOutlined style={{ fontSize: 14, }}
					spin
				/>} />
			)
		}
	</>
}


export default UserModule