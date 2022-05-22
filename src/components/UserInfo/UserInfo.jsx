import React, { useRef } from 'react';
import { Space, Divider, Typography, Progress, Button, Timeline, message } from 'antd';
import { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
	DrawerForm,
	ProFormText,
	ProFormDateRangePicker,
	ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import './UserInfo.less'
const { Title, Link } = Typography



export default ({ firstName, lastName, progress }) => {
	// const formRef = useRef();

	return (
		<DrawerForm
			title={firstName + ' ' + lastName}
			// formRef={formRef}
			trigger={
				<Link
					onClick={() => console.log("Прогресс")}

				>Прогресс</Link>
			}
			autoFocusFirstInput
			drawerProps={{
				destroyOnClose: true,
			}}
			// submitTimeout={2000}
			onFinish={async (values) => {
				console.log(values);
				message.success('success');

				return true;
			}}
		>
			<Title level={2}>Прогресс</Title>
			<Divider />

			<div className={'progress'} >
				<Progress percent={64.29} steps={30} />
			</div>


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