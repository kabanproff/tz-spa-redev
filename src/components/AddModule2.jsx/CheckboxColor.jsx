import React from 'react'
import { GithubPicker } from 'react-color';

const colors = ['#333333', '#4F4F4F', '#828282', '#BDBDBD', '#E0E0E0', '#F2F2F2', '#DA615C', '#E69C59', '#ECCA62', '#EEDF78',
	'#499359', '#55AB68', '#87CC9B', '#4480E5', '#4F9BD6', '#76CAEE', '#9158D8', '#B071D3', '#DAAAF5', '#EB8CF8']

const CheckboxColor = ({ getColor, height }) => {

	return <GithubPicker
		colors={colors}
		triangle={"hide"}
		width={'100 %'}
		onChangeComplete={(e) => { getColor(e.hex) }}
	/>

}
export default CheckboxColor