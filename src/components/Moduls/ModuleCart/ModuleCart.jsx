import React from 'react'
import { Card, Badge, Input, Spin, Popconfirm, message } from 'antd'
import { ProForm, ProFormText } from '@ant-design/pro-form';

import { EditOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { useEditModuleMutation, useDeleteModuleMutation } from '../../../redux/reducers/modulesApi';

import s from './ModuleCart.module.less'

const ModuleCart = ({ title, color, id }) => {
	const [editing, setEditing] = React.useState(false)
	const moduleRef = React.useRef()
	const [value, setValue] = React.useState(title)
	const [saveModule, { isLoading: loadSave, isSuccess: successSave, isError: errorSave }] = useEditModuleMutation()
	const [deleteModule, { isLoading: loadDelete, isError: errorDelete }] = useDeleteModuleMutation()

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

	const handleChange = (e) => {
		setValue(e.target.value)
	}
	const handleOutsideClick = (event) => {
		console.log('ref', moduleRef)
		const path = event.path || (event.composedPath && event.composedPath());
		console.log(path.includes(moduleRef.current))
		console.log('path', path)
		if (editing && !path.includes(moduleRef.current)) {
			edit()
		}
	}

	const save = () => {
		saveModule({ module: { title: value }, id: id })
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
						key="edit"
						title="Действительно Изменить?"
						onConfirm={save}
						onCancel={edit}
					>
						<EditOutlined />
					</Popconfirm>
					:
					<EditOutlined
						key="edit"
						onClick={edit}
					/>,
				<Popconfirm key="delete" title="Действительно Удалить?"
					onConfirm={del}
				>
					<CloseOutlined />
				</Popconfirm>
			]
	}

	return (
		// <React.Fragment ref={moduleRef} >
		<div ref={moduleRef} >
			<Badge.Ribbon
				className={s.budge}

				style={{ background: color, color: color }}
			>
				<Card
					headStyle={{
						border: 0,
						paddingTop: "7px",
						width: '75%'
					}}

					className={s.card}
					title={editing ?
						<>

							{/* <Input
								onChange={handleChange}
								autoFocus
								onFocus={e => e.target.select()}
								className={s.input}
								value={value}
								status={'error'}
								addonAfter={'SFDG'}
							/> */}
							<ProForm
								onValuesChange={handleChange}
							>
								<ProFormText
									// name='title'
									// label="Название:"
									className={s.input}

									rules={[
										(e) => ({
											validator(_, value) {
												console.log(e, _, value)
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
							</ProForm>
						</>
						: value}
					actions={actions()}
				>
				</Card>
			</Badge.Ribbon>
		</div>
		// </React.Fragment>
	)
}

export default ModuleCart