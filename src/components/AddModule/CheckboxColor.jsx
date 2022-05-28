import React from 'react'
import { Checkbox, Row, Col } from 'antd';
import classNames from 'classnames';
import { GithubPicker, TwitterPicker, CustomPicker, CompactPicker, BlockPicker } from 'react-color';

import * as antColors from '@ant-design/colors';
import './CheckboxColor.less'

const colors = ['#333333', '#4F4F4F', '#828282', '#BDBDBD', '#E0E0E0', '#F2F2F2', '#DA615C', '#E69C59', '#ECCA62', '#EEDF78',
	'#499359', '#55AB68', '#87CC9B', '#4480E5', '#4F9BD6', '#76CAEE', '#9158D8', '#B071D3', '#DAAAF5', '#EB8CF8']

export default ({ selected }) => {
	console.log("antColors", antColors)
	// const [checked, setChecked] = React.useState([])
	// const [checkedColor, setCheckedColor] = React.useState({})
	// console.log('checkedColor', checkedColor)
	// React.useEffect(() => {
	// 	checked.length > 1 && setChecked([checked[1]])
	// }, [checked])

	// function onChange(checkedValues) {
	// 	console.log('checked = ', checkedValues);
	// 	setChecked(checkedValues)
	// }

	// console.log("checked", checked)
	return <>

		<GithubPicker
			colors={colors}
			triangle={"hide"}
			width={'100 %'}
			// onChange={(e) => { console.log('e onChange ', e) }}
			onChangeComplete={(e) => { selected(e.hex) }}

		/>



		{/* <Checkbox.Group
			value={checked}
			// style={{ width: '100%' }} 
			onChange={onChange}>
			<Row>
				{
					colors.map(i => (
						<Col key={i}
						//  span={8}
						>
							<Checkbox
								className={classNames({ [`checkbox--${i}`]: i })}
								value={i}></Checkbox>
						</Col>
					))
				}

			</Row>
		</Checkbox.Group> */}


	</>
};