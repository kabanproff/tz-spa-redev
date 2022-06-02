import React from 'react'
import { Modal, Button, Form, Input, Select, message } from 'antd';
import ProForm, {
	ModalForm,
	ProFormText,
	ProFormSelect,
} from '@ant-design/pro-form';

import { useAddUserMutation } from '../../../redux/reducers/usersApi';
import { useGetModulesQuery } from '../../../redux/reducers/modulesApi';

import './AddUser.less'

const AddUser = (props) => {
	const {
		isRegister,
		values,
		errors,
		handleChange,
		dirty,
		onCancel,
		children,
		resetForm,
		handleReset,
		initialValues
	} = props
	const { data: mod } = useGetModulesQuery()
	const [addUser] = useAddUserMutation()
	console.log('values', values, props, onCancel, values.fullName === '')

	React.useEffect(() => {
		return () => {

			console.log('===================unmount==============')
		}
	}, [])

	const handleAddUser = async (user) => {
		const { fullName, instagram, telegram, module, login, } = user
		const [firstName, lastName] = fullName.trim().split(' ').filter(i => i)
		const newUser = { firstName, lastName, instagram, telegram, moduleId: module, login, isAdmin: false, password: values.password }
		console.log(firstName, lastName)
		await addUser(newUser).unwrap()
		message.success('succes');
		return true
	};

	return (
		<>
			<ModalForm
				title="Добавить студента"
				width={330}
				// preserve={false}
				// destroyOnClose
				trigger={
					<Button type="primary">
						{children}
					</Button>
				}
				autoFocusFirstInput
				modalProps={{
					onCancel: (e) => {
						resetForm()
						console.log('run', e)
					},
					closable: false,
					// preserve: false,
					okText: 'Готово',
					cancelText: 'Отмена'
				}}
				onFinish={handleAddUser}
				string={{
					preserve: false
				}}
			>
				<ProFormText
					name='fullName'
					label="Имя Фамилия:"
					initialValue={values.fullName}
					onChange={handleChange}
					validateStatus={
						!dirty ? ''
							: errors.fullName ? 'error' : 'success'
					}
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
						initialValue={values.password}


					/>}

				<ProFormText
					validateStatus={
						!dirty ? ''
							: errors.social ? 'error' : 'success'
					}
					hasFeedback
					help={errors.social}
					onChange={handleChange}
					initialValue={values.telegram}

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
					initialValue={values.instagram}

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
					initialValue={values.login}


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