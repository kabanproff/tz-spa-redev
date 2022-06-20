import React from 'react'
import { Button, message } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import { useAddModuleMutation } from '../../redux/reducers/modulesApi';
import { CheckboxColor, InputModal } from './forAddModule';

const AddModule = ({ children }) => {

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
				onFinish={handleAddModule}
			>
				<InputModal />
				<CheckboxColor getColor={getColor} />
			</ModalForm>
		</>
	);
};

export default AddModule;