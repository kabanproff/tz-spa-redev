import { Checkbox, Row, Col } from 'antd';
import {
	// ProForm,
	// ProFormCheckbox,
	// ProFormDigit,
	// ProFormDigitRange,
	// ProFormGroup,
	ProFormRadio,
	// ProFormRate,
	// ProFormSelect,
	// ProFormSlider,
	// ProFormSwitch,
	// ProFormText,
} from '@ant-design/pro-components';


function onChange(checkedValues) {
	console.log('checked = ', checkedValues);
}

export default () => (
	<>
		<Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
			<Row>
				<Col span={8}>
					<Checkbox color={'blue'} value="A"></Checkbox>
				</Col>
				<Col span={8}>
					<Checkbox value="B"></Checkbox>
				</Col>
				<Col span={8}>
					<Checkbox value="C"></Checkbox>
				</Col>
				<Col span={8}>
					<Checkbox value="D"></Checkbox>
				</Col>
				<Col span={8}>
					<Checkbox value="E"></Checkbox>
				</Col>
			</Row>
		</Checkbox.Group>

		<ProFormRadio.Group
			name="radio-button"
			label="Radio.Button"
			radioType="button"
			options={[
				{
					label: 'item 1',
					value: 'a',
				},
				{
					label: 'item 2',
					value: 'b',
				},
				{
					label: 'item 3',
					value: 'c',
				},
			]}
		/>
	</>
);