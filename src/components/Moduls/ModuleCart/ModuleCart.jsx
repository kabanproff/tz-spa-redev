import React from 'react'
import { Card, Badge, Input, Spin, Form, Popconfirm, message } from 'antd'
import { EditOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEditModuleMutation, useDeleteModuleMutation } from '../../../redux/reducers/modulesApi';

import s from './ModuleCart.module.less'

const ModuleCart = ({ title, color, id }) => {
	const moduleRef = React.useRef()
	const [editing, setEditing] = React.useState(false)
	const [value, setValue] = React.useState(title)
	const [saveModule, { isLoading: loadSave, isSuccess: successSave, isError: errorSave }] = useEditModuleMutation()
	const [deleteModule, { isLoading: loadDelete, isError: errorDelete }] = useDeleteModuleMutation()
	const [form] = Form.useForm();

	React.useEffect(() => {
		if (successSave) message.success('Модуль изменен')
		if (errorSave) message.error('Ошибка Изменения')
	}, [successSave, errorSave])

	React.useEffect(() => {
		if (editing) document.body.addEventListener('click', handleOutsideClick)
		if (!editing) document.body.removeEventListener('click', handleOutsideClick)
		return () => {
			document.body.removeEventListener('click', handleOutsideClick)
		}
	})

	const handleOutsideClick = (event) => {
		const path = event.path || (event.composedPath && event.composedPath());
		if (editing && !path.includes(moduleRef.current)) {
			edit()
		}
	}

	const save = async () => {
		if (form.getFieldError('module').length > 0) {
			message.error('Не валидное имя')
			return
		}
		const value = form.getFieldsValue().module
		await saveModule({ module: { title: value }, id: id })
		successSave && setValue(value)
		setEditing(!editing)
	}

	const edit = () => {
		setEditing(!editing)
		setValue(title)
	}

	const del = () => {
		deleteModule(id)
		errorDelete && message.error('Ошибка удаления')
	}

	const actions = () => {
		return (loadSave || loadDelete) ?
			Array(2).fill(
				<Spin
					indicator={
						<LoadingOutlined
							style={{ fontSize: 14, }}
							spin
						/>} />)
			:
			[
				editing ?
					<Popconfirm
						key={'edit'}
						title={'Действительно Изменить?'}
						onConfirm={save}
						onCancel={edit}
					>
						<EditOutlined />
					</Popconfirm>
					:
					<EditOutlined
						key={'edit'}
						onClick={edit}
					/>,
				<Popconfirm
					disabled={editing}
					key={'delete'}
					title={'Действительно Удалить?'}
					onConfirm={del}
				>
					<CloseOutlined />
				</Popconfirm>
			]
	}

	return (
		<div ref={moduleRef} >
			<Badge.Ribbon
				className={s.budge}
				style={{ background: color, color: color }}
			>
				<Card
					headStyle={{
						border: 0,
						paddingTop: '7px',
						height: '64px'
					}}

					className={s.card}
					title={editing ?
						<>
							<Form
								form={form}
								initialValues={{ module: value }}
							>
								<Form.Item
									name={'module'}
									rules={[
										{
											validator(_, value) {
												if (value && /[A-Za-z]+$/i.test(value) && /^\S*$/i.test(value)) return Promise.resolve()
												return Promise.reject(new Error('Модуль не валиден! Только латиница!'));
											},
										},
										{
											required: true,
											whitespace: true,
											message: 'Введите название Модуля!',
										},
									]}
									hasFeedback
								>
									<Input
										autoFocus
										className={s.input}
										value={value}
									/>
								</Form.Item>
							</Form>
						</>
						: title}
					actions={actions()}
				>
				</Card>
			</Badge.Ribbon>
		</div>
	)
}

export default ModuleCart