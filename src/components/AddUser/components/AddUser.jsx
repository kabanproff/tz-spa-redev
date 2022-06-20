import React from 'react'
import { Button, message } from 'antd';
import {
	ModalForm,
	ProFormText,
	ProFormSelect,
} from '@ant-design/pro-form';

import { useAddUserMutation } from '../../../redux/reducers/usersApi';
import { useGetModulesQuery } from '../../../redux/reducers/modulesApi';

import './AddUser.less'

const AddUser = ({
	isRegister,
	values,
	errors,
	handleChange,
	dirty,
	children, }) => {

	const { data: mod } = useGetModulesQuery()
	const [addUser, { isError }] = useAddUserMutation()

	const handleAddUser = async (user) => {
		const isErrors = Object.keys(errors).length
		const { fullName, instagram, telegram, module, login, } = user
		const [firstName, lastName] = fullName.trim().split(' ').filter(i => i)
		const newUser = { firstName, lastName, instagram, telegram, moduleId: module, login, isAdmin: false, password: values.password }

		if (!isErrors) {
			const user = await addUser(newUser).unwrap()
			if (user.id && !isError) {
				message.success('Пользователь добавлен');
				return true
			} else {
				message.warning('Пользователь уже существует')
				return false
			}
		}
		message.error('Введены не все данные');
		return false
	};

	return (
		<>
			<ModalForm
				title={'Добавить студента'}
				width={330}
				trigger={
					<Button type={'primary'}>
						{children}
					</Button>
				}
				autoFocusFirstInput
				modalProps={{
					closable: false,
					okText: 'Готово',
					cancelText: 'Отмена'
				}}
				onFinish={handleAddUser}
			>
				<ProFormText
					name={'fullName'}
					label={'Имя Фамилия:'}
					initialValue={values.fullName}
					onChange={handleChange}
					validateStatus={
						!dirty ? ''
							: errors.fullName ? 'error' : 'success'
					}
					help={errors.fullName}
					hasFeedback
					placeholder={''}

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
						name={'password'}
						label={'Пароль:'}
						placeholder={''}
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

					name={'telegram'}
					label={'Telegram:'}
					placeholder={''}
				/>

				<ProFormText
					validateStatus={
						!dirty ? ''
							: errors.social ? 'error' : 'success'
					}
					hasFeedback
					help={errors.social}
					name={'instagram'}
					label={'Instagram:'}
					placeholder={''}
					onChange={handleChange}
					initialValue={values.instagram}

				/>
				<ProFormText
					placeholder={''}
					name={'login'}
					label={'Mail:'}
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
					name={'module'}
					label={'Модуль:'}
					options={mod && mod.map(i => ({ value: i.id, label: i.title }))}
				/>
			</ModalForm>
		</>
	);
};

export default AddUser;