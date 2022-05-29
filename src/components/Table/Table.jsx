import React from 'react'
import { Table, Spin, Space, Typography, Popconfirm, Form, Input } from 'antd'
import { useEditUserMutation, useGetUsersFullQuery } from '../../redux/reducers/usersApi';
import { useGetUsersModulesQuery } from '../../redux/reducers/usersModulesApi';
import { LoadingOutlined } from '@ant-design/icons';

import './Table.less'
import UserInfo from '../UserInfo/UserInfo';
import Module from './UserModule';
import UserFullName from './UserFullName';
import { useGetModulesQuery } from '../../redux/reducers/modulesApi';
const { Link } = Typography;

const EditableCell = ({
	editing,
	dataIndex,
	title,
	record,
	index,
	children,
	reNameLoading,
	...restProps
}) => {
	const [fullName, setFullName] = React.useState({
		value: record?.firstName + ' ' + record?.lastName
	});



	const customValidate = ({ target }) => {
		// console.log(target.value)
		console.log(/^\s*[A-ZА-Я]{1}[a-zа-яё]+(?:\s+[A-ZА-Я]{1}[a-zа-яё]+)\s*$/.test(target.value))
		return /^\s*[A-ZА-Я]{1}[a-zа-яё]+(?:\s+[A-ZА-Я]{1}[a-zа-яё]+)\s*$/.test(target.value)
			? ({ validateStatus: 'success', errorMsg: null })
			: ({
				validateStatus: 'error',
				errorMsg: `Пожалуйста введите Имя и Фамилию через пробел с "Б"ольшой буквы!`
			})

	}

	const onValueChange = (value) => {
		// console.log(value)
		setFullName({ ...customValidate(value), value })
	}

	// console.log('dataI', dataIndex, title, index, children, editing, record, restProps)
	return (
		<td {...restProps}>
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
			)
			}

		</td >
	);
};


const CustomTable = ({ searchVal }) => {
	// console.log('searchval', searchVal)
	const { data: modulsId, isLoading: loadModId } = useGetUsersModulesQuery()
	const { data: users, isLoading } = useGetUsersFullQuery()
	const { data: mod } = useGetModulesQuery()
	const [editUser, resoo] = useEditUserMutation()
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = React.useState('');
	const [filterInfo, setFilterInfo] = React.useState({});
	console.log('users,moduleId', users, modulsId)
	const filterModule = (value, user) => modulsId.find(i => i.user_id === user.id)?.module_id === value

	const isEditing = (record) => +record.key === +editingKey;
	console.log('resoo', resoo, resoo.isLoading, resoo.isSuccess)

	const edit = (record) => {
		form.setFieldsValue({
			fullName: `${record.firstName} ${record.lastName}`,
			...record,
		});
		setEditingKey(record.key);
	};
	const cancel = () => {
		setEditingKey('');
	};

	const save = async (key) => {
		try {
			const { fullName } = await form.validateFields();
			const [firstName, lastName] = fullName.split(' ')
			console.log(fullName)
			console.log(firstName, lastName)
			const newData = [...users];
			const index = newData.findIndex((item) => key === item.key);
			console.log('oldNewData', newData)
			console.log('index', index)
			if (index > -1) {
				const item = newData[index];
				console.log('item', item, {
					login: item.login,
					password: item.password,
					isAdmin: item.isAdmin,
					module: item.module,
					firstName,
					lastName
				})
				console.log('-------------------------------', item.id)
				editUser({
					id: item.id,
					login: item.login,
					password: item.password,
					isAdmin: item.isAdmin,
					module: item.module,
					firstName,
					lastName
				}, item.id)
				console.log('resoedito', resoo)

				setEditingKey('');
			} else {

				setEditingKey('');
			}
			// console.log('row', row)
			console.log('newData', newData)
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: 'Имя Фамилия',
			id: 'id',
			filteredValue: searchVal || null,
			onFilter: (value, record) => {
				return (record.firstName + record.lastName).toLowerCase().indexOf(value.toLowerCase()) >= 0
			},
			render: (user) => <>
				<UserFullName searchVal={searchVal} {...user} />

			</>,
			editable: true,
		},
		{
			title: 'Название модуля',
			key: 'module',
			dataIndex: 'module',
			filteredValue: filterInfo.module || null,
			onFilter: filterModule
			// (value, record, a) => {

			// 	console.log('filter', value, record, a)
			// 	console.log('есть модуль?', record.module?.title === value)
			// 	return record.module?.title === value
			// }
			,
			render: (_, user, a) => { return <Module id={user.id} /> },
		},
		{
			title: 'Дата старта',
			key: 'date',
			dataIndex: 'createdAt',
			defaultSortOrder: 'ascend',
			filteredValue: {},
			showSorterTooltip: false,//{ title: 'Сортировать по дате старта' },
			sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
			render: strDate => {
				const getCurDate = (date) => date < 10 ? `0${date}` : date
				const date = new Date(strDate)
				return <p>{getCurDate(date.getDate())}.{getCurDate(date.getMonth() + 1)}.{date.getFullYear()}</p>
			}
		},
		{
			title: 'Действие',
			key: 'action',
			filteredValue: {},
			render: (text, record, data) => {
				// console.log('text', text)
				// console.log('record', record)
				const editable = isEditing(record);
				// console.log('editable', record.firstName, editable)
				return (
					<Space
						className={'action'}
						size="middle">
						<UserInfo
							{...record}
						/>

						{
							editable ?
								(
									<span>
										<Typography.Link
											onClick={() => save(record.key)}
											style={{
												marginRight: 8,
											}}
										>
											Сохранить
										</Typography.Link>
										<Popconfirm title="Действительно Отмена?"
											onConfirm={cancel}
										>
											<a>Отмена</a>
										</Popconfirm>
									</span>
								) : (
									<Typography.Link
										disabled={editingKey !== ''}
										onClick={() => edit(record)}>
										Изменить
									</Typography.Link>
								)

						}
					</Space>

				)
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (Array.isArray(mod) && col.dataIndex === 'module') {
			const moduls = mod.map(({ title, id }) => ({ text: title, value: id }))
			// console.log('Сравнение d mergetcol', columns[1].filters === moduls, moduls, col, col.onFilter)
			return {
				...col,
				filters: moduls,
				// onFilter.bind(this, { ...arg, asd: 555 })
			}
			// console.log('Сравнение', columns[1].filters === moduls)
		}
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => {
				return {
					record,
					dataIndex: col.dataIndex,
					title: col.title,
					editing: isEditing(record),
					reNameLoading: resoo.isLoading
				}
			},
		};
	});
	// console.log('mergedColumns', mergedColumns)
	// console.log('form', form)
	const onCh = (pagination, filters, sorter, extra) => {
		console.log('Various parameters', pagination, filters, sorter, extra);
		setFilterInfo(filters)
	}
	return (
		<>
			{
				// isLoading ? <h1>Loading</h1> :
				<Form form={form} component={false}>
					<Table
						// bordered={false}
						onChange={onCh}
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						loading={isLoading}
						columns={mergedColumns}
						// columns={columns}
						dataSource={users}
					// scroll={{ y: '60vh' }}
					/>
				</Form>
			}
		</>
	)
}

export default CustomTable
const dataaaa = [
	{
		key: '1',
		fullName: 'Юра Лисовский',
		createdAt: "2021-10-10T08:15:54.206Z",
		modules: ['React', 'JS'],
	},
	{
		key: '2',
		fullName: 'Алексей Попов',
		createdAt: "2020-10-10T08:15:54.206Z",
		modules: ['Node'],
	},
	{
		key: '3',
		fullName: 'Дмитрий Силицкий',
		createdAt: "2020-04-01T08:15:54.206Z",
		modules: ['JS'],
	},
	{
		key: '4',
		fullName: 'Алексей Гатилов',
		createdAt: "2021-09-20T08:15:54.206Z",
		modules: ['Node', 'JS'],
	},
	{
		key: '5',
		fullName: 'Женя Клименков',
		createdAt: "2022-02-15T08:15:54.206Z",
		modules: ['HTML/CSS'],
	},
	{
		key: '6',
		fullName: 'Андрей Гончаров',
		createdAt: "2021-11-25T08:15:54.206Z",
		modules: ['Базы данных'],
	},
	{
		key: '7',
		fullName: 'Артём Протько',
		createdAt: "2021-09-01T10:15:54.206Z",
		modules: ['Node', 'JS', 'HTML/CSS', 'Базы данных'],
	},
	{
		key: '8',
		fullName: 'Константин Смирнов',
		createdAt: "2021-08-05T08:15:54.206Z",
		modules: ['React'],
	},
	{
		key: '9',
		fullName: 'Андрей Боров',
		createdAt: "2021-04-09T08:15:54.206Z",
		modules: ['Базы данных', 'JS'],
	},
	{
		key: '10',
		fullName: 'Евгений Шиман',
		createdAt: "2021-01-19T08:15:54.206Z",
		modules: ['Node'],
	},
	{
		key: '11',
		fullName: 'Саша Пархович',
		createdAt: "2021-07-14T08:15:54.206Z",
		modules: ['JS', 'HTML/CSS'],
	},
	{
		key: '12',
		fullName: 'Виталик Вайтехович',
		createdAt: "2021-07-11T08:15:54.206Z",
		modules: ['JS'],
	},
	{
		key: '13',
		fullName: 'Кирилл Батраков',
		createdAt: "2021-12-27T08:15:54.206Z",
		modules: ['JS'],
	},
	{
		key: '14',
		fullName: 'Дмитрий Романов',
		createdAt: "2021-10-07T08:15:54.206Z",
		modules: ['Node'],
	},
	{
		key: '15',
		fullName: 'Денис Василевский',
		createdAt: "2022-01-13T08:15:54.206Z",
		modules: ['Базы данных'],
	},
	{
		key: '16',
		fullName: 'Кирилл Орлов',
		createdAt: "2022-04-23T08:15:54.206Z",
		modules: ['HTML/CSS'],
	},
	{
		key: '17',
		fullName: 'Илья Нос',
		createdAt: "2021-04-15T08:15:54.206Z",
		modules: ['JS'],
	},
	{
		key: '18',
		fullName: 'Валерий Поддубный',
		createdAt: "2021-07-19T08:15:54.206Z",
		modules: ['JS', 'HTML/CSS', 'Базы данных'],
	},
	{
		key: '19',
		fullName: 'Ігар	Магалінскі',
		createdAt: "2021-06-11T08:15:54.206Z",
		modules: ['Базы данных', 'JS'],
	},
	{
		key: '20',
		fullName: 'Николас Грибанов',
		createdAt: "2021-03-14T08:15:54.206Z",
		modules: ['JS'],
	},
	{
		key: '21',
		fullName: 'Вячеслав Роговой',
		createdAt: "2021-03-24T08:15:54.206Z",
		modules: ['Node', 'HTML/CSS'],
	},

];




