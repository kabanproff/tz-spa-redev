import { withFormik } from 'formik'
import AuthorizePage from '../components/AuthorizePage'


export default withFormik({
	mapPropsToValues: () => ({ login: 'kaban@lol.com', password: 'qqqqqQ1!' }),
	validate: values => {
		const errors = {};

		if (!values.login) {
			errors.login = 'Введите aдрес электронной почты';
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.login)
		) {
			errors.login = 'Логин должен быть e-mail'
		}

		if (!values.password) {
			errors.password = 'Введите пароль'
		} else if (
			!/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/i.test(values.password)
		) {
			errors.password = 'Пароль должен содержать минимум 8 символов, 1 заглавную букву, 1 цифру и специальный символ'
		}

		return errors;
	},
	displayName: 'BasicForm',
})(AuthorizePage)