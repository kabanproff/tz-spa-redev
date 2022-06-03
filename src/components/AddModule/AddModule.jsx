import React from 'react'
import { Button, message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import CheckboxColor from './CheckboxColor';
import { useAddModuleMutation } from '../../redux/reducers/modulesApi';

const AddModule = ({ children }) => {

	const [addModule, { isSuccess, isError }] = useAddModuleMutation()
	const [selectedColor, setSelectedColor] = React.useState('#fff')
	const getColor = (color) => setSelectedColor(color)
	const handleAddModule = async (module) => {
		await addModule({ title: module.title, color: selectedColor }).unwrap()
		if (isSuccess) message.success('success');
		if (isError) message.error('error');
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
					rules={[
						() => ({
							validator(_, value) {
								if (value && /[A-Za-z]+$/i.test(value)) return Promise.resolve()
								return Promise.reject(new Error('Модуль не валиден! Только латиница!'));
							},
						}),
						{
							required: true,
							message: 'Пожалуйста введите название Модуля!',
						},
					]}
					hasFeedback
					placeholder=''
				/>
				<CheckboxColor getColor={getColor} />
			</ModalForm>
		</>
	);
};

export default AddModule;