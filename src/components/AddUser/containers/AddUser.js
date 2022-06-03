import { withFormik } from 'formik'

import AddUser from '../components/AddUser'


export default withFormik({
	mapPropsToValues: () => ({ login: '', fullName: '', password: 'testsT1!', telegram: '@', instagram: '@' }),
	validate: values => {
		const errors = {};
		if (!values.fullName) {
			errors.fullName = 'Введите "Имя Фамилию"';
		} else if (
			!/^[A-ZА-ЯІ]{1}[a-zа-яёі]+(\s+[A-ZА-ЯІ]{1}[a-zа-яёі]+)$/.test(values.fullName)
		) {
			errors.fullName = 'Имя и Фамилия с большой буквы через пробел'
		}
		if (!values.telegram || !values.instagram) {
			errors.social = 'Необходима ссылка на соцсеть';
		} else if (
			!/^@[a-z0-9]*$/.test(values.telegram) || !/^@[a-z0-9]*$/.test(values.instagram)
		) {
			errors.social = '@...'
		}
		if (!values.login) {
			errors.mail = 'Введите aдрес электронной почты';
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)
		) {
			errors.mail = 'Логин должен быть e-mail'
		}

		if (!values.password) {
			errors.password = 'Введите пароль'
		} else if (
			!/^(?=(.*[a-zа-яё]){1,})(?=(.*[A-ZА-Я]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/i.test(values.password)
		) {
			errors.password = 'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 цифру и специальный символ'
		}

		return errors;
	},

	displayName: 'BasicForm',
})(AddUser)