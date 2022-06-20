import React from 'react'
import { Spin, Form, Input } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';


const EditableCell = ({
	editing,
	dataIndex,
	title,
	record,
	index,
	children,
	reNameLoading,
	id,
	key,
	...restProps }) => {

	const [fullName, setFullName] = React.useState({
		value: record?.firstName + ' ' + record?.lastName
	});


	const customValidate = ({ target }) => {
		return /^\s*[A-ZА-Я]{1}[a-zа-яё]+(?:\s+[A-ZА-Я]{1}[a-zа-яё]+)\s*$/.test(target.value)
			? ({ validateStatus: 'success', errorMsg: null })
			: ({
				validateStatus: 'error',
				errorMsg: `Пожалуйста введите Имя и Фамилию через пробел с "Б"ольшой буквы!`
			})
	}

	const onValueChange = (value) => {
		setFullName({ ...customValidate(value), value })
	}

	return (
		<td
			{...restProps}>
			{editing ? (
				<Form.Item
					name={'fullName'}
					validateStatus={fullName.validateStatus}
					help={fullName.errorMsg}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Пожалуйста введите ${title} через пробел!`,
						},
					]}
				>
					<Input
						onChange={onValueChange}
					/>
				</Form.Item>
			) : (
				<>
					{children} {
						reNameLoading && <Spin
							indicator={
								<LoadingOutlined
									style={{ fontSize: 14, }}
									spin
								/>} />
					}
				</>
			)}
		</td >
	);
};

export default EditableCell