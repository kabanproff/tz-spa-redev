import React from 'react'
import Highlighter from "react-highlight-words";
import { Typography } from 'antd'

const { Link } = Typography;

const UserFullName = ({ login, id, firstName, lastName, searchVal }) => {

	const telegram = login.split('@')[0]

	return <Link key={id} href={`https://t.me/${telegram}`} target="_blank">

		<Highlighter
			highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
			searchWords={searchVal}
			autoEscape
			textToHighlight={firstName + ' ' + lastName}
		/>
	</Link>

}

export default UserFullName