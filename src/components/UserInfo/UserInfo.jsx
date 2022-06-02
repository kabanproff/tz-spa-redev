import React from 'react';
import { Col, Row, Statistic, Divider, Typography, Progress, Button, Timeline, message } from 'antd';
import { DrawerForm } from '@ant-design/pro-form';
import './UserInfo.less'
const { Title, Link } = Typography

export default ({ firstName, lastName, progress, createdAt }) => {

	const deadline = Math.floor((Date.now() - Date.parse(createdAt)) / 864e5);
	const progressLine = (Math.random() * 1000 / 10).toFixed(2)
	const tasksComplete = (progressLine * 50 / 100).toFixed()
	const checkComplete = tasksComplete < 10 ? '1' : tasksComplete.slice(0, 1)

	return (
		<DrawerForm
			title={firstName + ' ' + lastName}
			submitter={false}
			trigger={
				<Link
				>Прогресс</Link>
			}
			drawerProps={{
				destroyOnClose: true,
			}}
		>
			<Title level={2}>Прогресс</Title>
			<Divider />
			<div className={'progress'} >
				<Progress percent={progressLine} steps={30} />
			</div>
			<Divider />
			<Row gutter={16}
				align={"center"}
			>
				<Col span={6}>
					<Statistic
						title="Колличество дней"
						value={deadline}
					/>
				</Col>
				<Col span={6}>
					<Statistic title="Задачи" value={tasksComplete} suffix="/ 50" />
				</Col>
				<Col span={6}>
					<Statistic title="Чек-лист" value={checkComplete} suffix="/ 5" />
				</Col>
			</Row>
			<Divider />
			<Title level={2}>Шаги</Title>
			<Divider />
			<Timeline mode="alternate" >{
				progress.map(i => (
					<Timeline.Item key={i.title} color={i.status ? "green" : "gray"}>{i.title}</Timeline.Item>
				))
			}
			</Timeline>
		</DrawerForm>
	);
};