import React from 'react'
import { Layout, Button, PageHeader } from 'antd';
import ModuleCart from './ModuleCart/ModuleCart';
import s from './Moduls.module.less'
const { Content } = Layout;

const Moduls = () => {
	return (
		<Layout>
			<Content >
				<div className={s.moduls__content}>
					<PageHeader
						className={s.moduls__header}
						title="Модули"
						extra={[
							<Button key="1" type="primary">
								Добавить модуль
							</Button>
						]}
					/>
					<div className={s.block}>
						{
							Array(5).fill(null).map((i, id) => (
								<ModuleCart key={id} title={'HTML/CSS'} />
							))
						}
					</div>
				</div>
			</Content>
		</Layout>
	)
}

export default Moduls