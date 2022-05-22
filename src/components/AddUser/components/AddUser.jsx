import React from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormDateRangePicker,
	ProFormSelect,
} from '@ant-design/pro-form';

import { useAddUserMutation, useGetModulesQuery } from '../../../redux/reducers/usersApi';

import './AddUser.less'
// const { Option } = Select

const AddUser = ({
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
	//   const [visible, setVisible] = React.useState(false);
	// const [confirmLoading, setConfirmLoading] = React.useState(false);
	const [modalText, setModalText] = React.useState('Content of the modal');
	const { data: mod } = useGetModulesQuery()
	const [addUser, addUserresp] = useAddUserMutation()

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

	const handleAddUser = async (user) => {
		const { fullName, instagram, telegram, module, login, } = user
		console.log('ww', user)
		const [firstName, lastName] = fullName.trim().split(' ').filter(i => i)
		const newUser = { firstName, lastName, instagram, telegram, moduleId: module, login, isAdmin: false, password: values.password }
		console.log(firstName, lastName)
		await addUser(newUser).unwrap()
		// await addUser(newUser).unwrap()

		console.log(addUserresp)
		message.success('succes');
		return true

	};

	// const handleCancel = () => {
	// 	console.log('Clicked cancel button');
	// 	setVisible(false);
	// };
	const onFinish = (values) => {
		console.log('Received values of form: ', values);
	};
	console.log()
	return (
		<>
			<ModalForm
				title="Добавить студента"
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
				onFinish={handleAddUser}
			>
				<ProFormText

					name='fullName'
					label="Имя Фамилия:"
					onChange={handleChange}
					validateStatus={
						!dirty ? ''
							: errors.fullName ? 'error' : 'success'
					}
					// initialValue={values.fullname}
					help={errors.fullName}
					hasFeedback
					placeholder=''

				/>
				{
					isRegister &&
					<ProFormText
						validateStatus={
							!dirty ? ''
								: errors.password ? 'error' : 'success'
						}
						hasFeedback
						help={errors.password}
						name='password'
						label="Пароль:"
						placeholder=''
						onChange={handleChange}

					/>}

				<ProFormText
					validateStatus={
						!dirty ? ''
							: errors.social ? 'error' : 'success'
					}
					hasFeedback
					help={errors.social}
					onChange={handleChange}
					name='telegram'
					label="Telegram:"
					placeholder=''
				/>

				<ProFormText
					validateStatus={
						!dirty ? ''
							: errors.social ? 'error' : 'success'
					}
					hasFeedback
					help={errors.social}
					name="instagram"
					label="Instagram:"
					placeholder=''
					onChange={handleChange}

				/>
				<ProFormText

					placeholder=''
					name="login"
					label="Mail:"
					validateStatus={
						!dirty ? ''
							: errors.mail ? 'error' : 'success'
					}
					hasFeedback
					help={errors.mail}
					onChange={handleChange}

				/>
				<ProFormSelect
					initialValue={[21]}
					name="module"
					label="Модуль:"
					options={mod && mod.map(i => ({ value: i.id, label: i.title }))}
				/>
			</ModalForm>




		</>
	);
};

export default AddUser;