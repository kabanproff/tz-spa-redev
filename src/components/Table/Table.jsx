import React from 'react'
import { Table, Tag, Space } from 'antd'
import { Link } from 'react-router-dom';
import { useGetUsersQuery, useGetModulesQuery } from '../../redux/reducers/usersApi';
import { useDispatch } from 'react-redux';
import { getUsersFullData } from '../../redux/reducers/usersSlice';

// const modules = ['JS', 'Node', 'Базы данных', 'HTML/CSS', 'React',]

const columns = [
	{
		title: 'Имя Фамилия',
		// dataIndex: 'firstName',
		key: 'id',
		editable: true,
		render: (_, item,) => {
			// console.log(_, item)
			return <Link key={item.id} to={':id'}>{item.firstName + ' ' + item.lastName}</Link>
		}
	},
	{
		title: 'Название модуля',
		key: 'module',
		dataIndex: 'module',
		// editable: true,
		onFilter: (value, record) => {
			console.log(value, record)
			return record.module?.title === value
		},
		render: (module, user,) => {
			// console.log(module, user)
			return <>
				{
					module &&
					<Tag color={module.color} key={user.key}>
						{module.title}
					</Tag>
				}
			</>


		},
	},
	{
		title: 'Дата старта',
		key: 'date',
		dataIndex: 'createdAt',
		defaultSortOrder: 'ascend',
		// showSorterTooltip: (e) => console.log(e),//{ title: 'Сортировать по дате старта' },
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
		render: (text, record, data) => {
			// console.log('text', text)
			// console.log('record', record)
			return <Space size="middle">
				<Link to={':dd'}>Прогресс</Link>
				<Link to={'ff'}>Изменить</Link>
			</Space>
		},
	},
];

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


const CustomTable = () => {

	// const dispatch = useDispatch()
	// const { data, isLoading } = useGetUsersFullQuery()
	const { data: users, isLoading } = useGetUsersQuery()
	// const users = useGetUsersQuery()
	const { data: mod } = useGetModulesQuery()
	console.log(mod)
	React.useEffect(() => {

		columns[1].filters = mod && mod.map(({ title }) => ({ text: title, value: title }))
	}, [mod])
	// window.q = arr
	// React.useEffect(() => {
	// console.log('use-----', arr)
	// arr && arr.then(res => console.log('thenres', console.log(res)))
	// }, [arr])
	console.log(users)
	// console.log('useget', datas)
	// const { data: data2, isLoading: isLoading2 } = useGetUserQuery(82)
	// const usersDataModule = data.map( i => useGetUserQuery(i.id))
	// React.useEffect(() => {
	// try {
	// const useGetUsersFullModule = data.map(i => dispatch(useGetUserQuery(i.id)))
	// Promise.all[

	// ].then(res => {
	// 	console.log(res)
	// })
	// } catch (error) {
	// console.log(error)
	// }
	// }, [])

	// console.log(data, data2)
	// console.log(isLoading, isLoading2)
	return (
		<>
			{
				isLoading ? <h1>Loading</h1> :
					<Table columns={columns} dataSource={users} scroll={{ y: '60vh' }} />
			}
		</>
	)
}

export default CustomTable





