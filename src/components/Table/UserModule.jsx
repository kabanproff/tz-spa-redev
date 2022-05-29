import React from 'react'
import { Tag, Spin } from 'antd'
import { useGetUserModuleQuery } from '../../redux/reducers/usersModulesApi'
import { useGetModulesIdQuery } from '../../redux/reducers/modulesApi'
import { useDispatch } from 'react-redux'
import { emptySplitApi } from '../../redux/reducers/emptySplitApi'
import { LoadingOutlined } from '@ant-design/icons';


const Module = (id) => {
	// console.log('props', props)
	const dispatch = useDispatch()
	const [loading, setLoading] = React.useState(true)
	const { data: module, isLoading: load1 } = useGetUserModuleQuery(id)
	// const { data: module, isLoading: load2 } = useGetModulesIdQuery(moduleId[0].module_id, { skip: !load1 })
	// console.log(module, load1)
	// console.log(color, title)
	const { color = '#fff', title = '' } = module ?? {}



	const moduleColor = color === '#0000FF' ?
		'blue' : color === '#FFFF00' ?
			'purple' : color === '#EEDF78' ?
				'grey' : color === '#CA8463' ?
					'orange' : color === '#B0CC8A' ?
						'green' : color
	return <>
		{
			!load1 ? (
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


export default Module