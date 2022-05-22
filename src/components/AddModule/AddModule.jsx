import React from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd';
import ProForm, {
	ModalForm,
	ProFormText,

} from '@ant-design/pro-form';

import CheckboxColor from './CheckboxColor';

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

	console.log('validator',
		values,
		errors,
		// handleChange,
		// handleSubmit,
		dirty,
		// visible,
		// onCancel
	)
	//   const showModal = () => {
	//     setVisible(true);
	//   };

	// const handleAddModule = async (user) => {
	// 	const { fullName, instagram, telegram, module, login, } = user
	// 	console.log('ww', user)
	// 	const [firstName, lastName] = fullName.trim().split(' ').filter(i => i)
	// 	const newUser = { firstName, lastName, instagram, telegram, moduleId: module, login, isAdmin: false, password: values.password }
	// 	console.log(firstName, lastName)
	// 	// await addUser(newUser).unwrap()
	// 	// await addUser(newUser).unwrap()

	// 	// console.log(addUserresp)
	// 	message.success('succes');
	// 	return true

	// };

	// const handleCancel = () => {
	// 	console.log('Clicked cancel button');
	// 	setVisible(false);
	// };
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
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
			// onFinish={handleAddUser}
			>
				<ProFormText

					// name='fullName'
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
				<CheckboxColor />
			</ModalForm>
		</>
	);
};

export default AddModule;