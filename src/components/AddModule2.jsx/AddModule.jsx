import React from 'react'
import { Button, message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import CheckboxColor from './CheckboxColor';
import { useAddModuleMutation } from '../../redux/reducers/modulesApi';
import InputModal from './InputModal';

const AddModule = ({ children }) => {
	const [visible, setVisible] = React.useState(false)
	const [addModule, { isSuccess, isError }] = useAddModuleMutation()
	const [selectedColor, setSelectedColor] = React.useState('#fff')
	const getColor = (color) => setSelectedColor(color)

	const handleAddModule = async (module) => {
		await addModule({ title: module.title, color: selectedColor }).unwrap()
		if (isSuccess) message.success('Модуль добавлен');
		if (isError) message.error('Ошибка добавления модуля');
		return true
	};

	return (
		<>
			<ModalForm
				title={children}
				width={330}
				visible={visible}
				trigger={
					<Button type="primary" onClick={() => setVisible(!visible)}>
						{children}
					</Button>
				}
				autoFocusFirstInput
				modalProps={{
					closable: false,
					okText: 'Готово',
					cancelText: 'Отмена'
				}}
				// submitTimeout={2000}
				onFinish={handleAddModule}
			>
				<InputModal />
				{/* <ProFormText
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
				/> */}
				<CheckboxColor getColor={getColor} />
			</ModalForm>
		</>
	);
};

export default AddModule;