import React from 'react'
import { Button, Input, Modal, Form, message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import CheckboxColor from './CheckboxColor';
import { useAddModuleMutation } from '../../redux/reducers/modulesApi';
import InputModal from './InputModal';

const AddModule = ({ visible, onCreate, onCancel }) => {
	// const [isModalVisible, setIsModalVisible] = React.useState(false)
	const [selectedColor, setSelectedColor] = React.useState('#fff')
	const [form] = Form.useForm();
	const getColor = (color) => setSelectedColor(color)

	// const handleAddModule = async (module) => {
	// 	await addModule({ title: module.title, color: selectedColor }).unwrap()
	// 	if (isSuccess) message.success('Модуль добавлен');
	// 	if (isError) message.error('Ошибка добавления модуля');
	// 	return true
	// };
	// const showModal = () => {
	// 	setIsModalVisible(true);
	// };

	const handleOk = () => {
		form
			.validateFields()
			.then((values) => {
				form.resetFields();
				onCreate(values);
			})
			.catch((info) => {
				console.log('Validate Failed:', info);
			});
		// setIsModalVisible(false);
	};

	// const handleCancel = () => {
	// 	setIsModalVisible(false);
	// };

	return (


		<Modal
			title="Basic Modal"
			okText={'Готово'}
			cancelText={'Отмена'}
			visible={visible}
			onOk={handleOk}
			onCancel={onCancel}
		>
			<Form
				form={form}
				layout="vertical"
				name="form_in_modal"
				initialValues={{
					modifier: 'public',
				}}
			>
				<Form.Item
					name="title"
					label="Title"
					hasFeedback
					rules={[
						() => ({
							validator(_, value) {
								if (value && /[A-Za-z]+$/i.test(value)) return Promise.resolve()
								return Promise.reject(new Error('Модуль не валиден! Только латиница!'));
							},
						}),
						{
							required: true,
							message: 'Please input the title of collection!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item name="color">
					<CheckboxColor getColor={getColor} />
				</Form.Item>
			</Form>
		</Modal>


	);
};

export default AddModule;