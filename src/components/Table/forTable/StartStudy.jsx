import React from 'react'

const StartStudy = ({ strDate }) => {
	const getCurDate = (date) => date < 10 ? `0${date}` : date
	const date = new Date(strDate)
	return <p>{getCurDate(date.getDate())}.{getCurDate(date.getMonth() + 1)}.{date.getFullYear()}</p>
}

export default StartStudy