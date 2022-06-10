import React from 'react'
import { Button, Layout, PageHeader } from 'antd';
import { useGetModulesQuery } from '../../redux/reducers/modulesApi';
import ModuleCart from './ModuleCart/ModuleCart';
import AddModule from '../AddModule/AddModule'
import { useAddModuleMutation } from '../../redux/reducers/modulesApi';

import s from './Moduls.module.less'

const { Content } = Layout;

const Moduls = () => {
	const { data: moduls } = useGetModulesQuery()
	const [isModalVisible, setIsModalVisible] = React.useState(false)
	const [addModule, { isSuccess, isError }] = useAddModuleMutation()

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		// addModule
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	// console.log("moduls", moduls)
	return (
		<Layout>
			<Content >
				<div className={s.moduls__content}>
					<Button type="primary" onClick={showModal}>
						Добавить Модуль
					</Button>
					{/* <PageHeader
						className={s.moduls__header}
						title="Модули"
						extra={[

							<AddModule
								visible={isModalVisible}
								onCreate={handleOk}
								onCancel={handleCancel} />
						]}
					/> */}
					<AddModule
						visible={isModalVisible}
						onCreate={handleOk}
						onCancel={handleCancel} />
					{/* ]} */}
					<div className={s.block}>
						{
							moduls &&
							moduls.map(i => (
								<ModuleCart key={i.id} id={i.id} title={i.title} color={i.color} />
							))

						}
					</div>
				</div>
			</Content>
		</Layout>
	)
}

export default Moduls