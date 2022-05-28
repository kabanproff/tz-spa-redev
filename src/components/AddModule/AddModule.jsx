import React from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd';
import ProForm, {
	ModalForm,
	ProFormText,

} from '@ant-design/pro-form';

import CheckboxColor from './CheckboxColor';
import { useAddModuleMutation } from '../../redux/reducers/modulesApi';

// import { useAddUserMutation, useGetModulesQuery } from '../../../redux/reducers/usersApi';

// import './AddUser.less'
// const { Option } = Select

const AddModule = ({
	isRegister,
	values,
	errors,
	handleChange,
	handleSubmit,
	dirty,
	visible,
	onCancel,
	children,
	...spread
}) => {
	console.log(spread)
	// const { data: mod } = useGetModulesQuery()
	// const [addUser, addUserresp] = useAddUserMutation()
	// const [addUser, addUserresp] = useAddUserMutation()
	const [addModule, addModuleResp] = useAddModuleMutation()
	const [selectedColor, setSelectedColor] = React.useState('#fff')
	console.log(selectedColor)
	console.log('validator',
		values,
		errors,
		dirty,

	)

	const handleAddModule = async (module) => {

		await addModule({ title: module.title, color: selectedColor }).unwrap()
		console.log('addModuleResp', addModuleResp)

		message.success('succes');
		return true

	};

	return (
		<>
			<ModalForm
				title={children}
				width={330}
				trigger={
					<Button type="primary">
						{children}
					</Button>
				}
				autoFocusFirstInput
				modalProps={{
					onCancel: () => console.log('run'),
					closable: false,
					okText: 'Готово',
					cancelText: 'Отмена'
				}}
				onFinish={handleAddModule}
			>
				<ProFormText

					name='title'
					label="Название:"
					// onChange={handleChange}
					// validateStatus={
					// 	!dirty ? ''
					// 		: errors.fullName ? 'error' : 'success'
					// }
					// help={errors.fullName}///
					hasFeedback
					placeholder=''
				/>
				<CheckboxColor selected={setSelectedColor} />
			</ModalForm>
		</>
	);
};

export default AddModule;