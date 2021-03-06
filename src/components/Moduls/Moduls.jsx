import React from 'react'
import { Layout, PageHeader } from 'antd';
import { useGetModulesQuery } from '../../redux/reducers/modulesApi';
import ModuleCart from './ModuleCart/ModuleCart';
import AddModule from '../AddModule/AddModule'

import s from './Moduls.module.less'

const { Content } = Layout;

const Moduls = () => {

	const { data: moduls } = useGetModulesQuery()

	return (
		<Layout>
			<Content >
				<div className={s.moduls__content}>
					<PageHeader
						className={s.moduls__header}
						title={'Модули'}
						extra={[
							<AddModule key={'1'}>Добавить Модуль</AddModule>,
						]}
					/>
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