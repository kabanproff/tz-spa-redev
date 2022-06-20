import React from 'react'
import { Table, Form } from 'antd'
import { useEditUserMutation, useGetUsersFullQuery } from '../../redux/reducers/usersApi';
import { useGetUsersModulesQuery } from '../../redux/reducers/usersModulesApi';
import { useGetModulesQuery } from '../../redux/reducers/modulesApi';
import { UserModule, UserFullName, StartStudy, ActionCollumns, EditableCell } from './forTable'

import './Table.less'

const CustomTable = ({ searchVal }) => {

	const { data: modulsId } = useGetUsersModulesQuery()
	const { data: users, isLoading: usersLoading, isFetching } = useGetUsersFullQuery()
	const { data: mod } = useGetModulesQuery()
	const [editUser, { isLoading: renameLoading }] = useEditUserMutation()
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = React.useState('');
	const [renameKey, setRenameKey] = React.useState('');
	const [filterInfo, setFilterInfo] = React.useState({});

	const filterModule = (value, user) => modulsId.find(i => i.user_id === user.id)?.module_id === value
	const isEditing = (record) => +record.key === +editingKey;
	const isRename = (record) => (renameLoading || isFetching) && +record.key === +renameKey;

	const edit = (record) => {
		form.setFieldsValue({
			fullName: `${record.firstName} ${record.lastName}`,
			...record,
		});
		setEditingKey(record.key);
		setRenameKey(record.key);
	};
	const cancel = () => {
		setEditingKey('');
		setRenameKey('');
	};

	const save = async (key) => {
		try {
			const { fullName } = await form.validateFields();
			const [firstName, lastName] = fullName.split(' ')
			const newData = [...users];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				editUser({
					id: item.id,
					login: item.login,
					password: item.password,
					isAdmin: item.isAdmin,
					module: item.module,
					firstName,
					lastName
				}, item.id)
				setEditingKey('');
			} else {

				setEditingKey('');
			}
		} catch (errInfo) {
			console.log('Failed:', errInfo);
		}
	};

	const columns = [
		{
			title: 'Имя Фамилия',
			id: '1',
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
			onFilter: filterModule,
			render: (_, user) => <UserModule id={user.id} />,
		},
		{
			title: 'Дата старта',
			key: 'date',
			dataIndex: 'createdAt',
			defaultSortOrder: 'ascend',
			filteredValue: {},
			showSorterTooltip: false,
			sorter: (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
			render: strDate => <StartStudy strDate={strDate} />
		},
		{
			title: 'Действие',
			key: 'action',
			filteredValue: {},
			render: (_, record) =>
				<ActionCollumns
					record={record}
					editingKey={editingKey}
					isEditing={isEditing}
					cancel={cancel}
					edit={edit}
					save={save}
				/>,
		},
	];

	const mergedColumns = columns.map((col) => {
		if (Array.isArray(mod) && col.dataIndex === 'module') {
			const moduls = mod.map(({ title, id }) => ({ text: title, value: id }))
			return {
				...col,
				filters: moduls,
			}
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
					reNameLoading: isRename(record)
				}
			},
		};
	});

	const onChangeTable = (_, filters) => {
		setFilterInfo(filters)
	}
	return (
		<>
			{
				<Form form={form} component={false}>
					<Table
						onChange={onChangeTable}
						components={{
							body: {
								cell: EditableCell,
							},
						}}
						loading={usersLoading}
						columns={mergedColumns}
						dataSource={users}
					/>
				</Form>
			}
		</>
	)
}

export default CustomTable