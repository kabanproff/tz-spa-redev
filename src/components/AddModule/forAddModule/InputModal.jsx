import React from 'react'
import { ProFormText } from '@ant-design/pro-form';

const InputModal = () => <ProFormText
	name={'title'}
	label={'Название:'}
	rules={[
		() => ({
			validator(_, value) {
				if (value && /[A-Za-z]+$/i.test(value) && /^\S*$/i.test(value)) return Promise.resolve()
				return Promise.reject(new Error('Модуль не валиден! Только латиница!'));
			},
		}),
		{
			required: true,
			message: 'Пожалуйста введите название Модуля!',
		},
	]}
	hasFeedback
	placeholder={''}
/>

export default InputModal