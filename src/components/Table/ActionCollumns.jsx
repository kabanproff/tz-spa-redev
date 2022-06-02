import React from 'react'
import { Space, Typography, Popconfirm } from 'antd'

import UserInfo from '../UserInfo/UserInfo';



const ActionCollumns = ({ record, isEditing, editingKey, cancel, edit, save }) => {

	const editable = isEditing(record);

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
}

export default ActionCollumns