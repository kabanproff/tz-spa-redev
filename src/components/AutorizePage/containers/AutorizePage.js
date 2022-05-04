import axios from 'axios';
import { withFormik } from 'formik'
import { useDispatch } from 'react-redux';
import { getUser } from '../../../redux/reducers/userSlice';
// import { authorization } from '../../../redux/actions/user';


import AuthorizePage from '../components/AuthorizePage'


export default withFormik({
	mapPropsToValues: () => ({ login: '', password: 'qqqqqQ1!' }),
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

	// handleSubmit: (values, { setErrors, setSubmitting }) => {
	// const dispatch = useDispatch()
	// dispatch(getUser(values))
	// return authorization(values, { setErrors, setSubmitting})

	// return
	// (
	// 	async (dispatch) => {
	// 		try {
	// 			console.log(values)

	// 			const { data } = await axios.post('https://typ-back.herokuapp.com/api/auth/login', values)
	// 			if (data.message) {
	// 				setErrors({ login: "Проверьте правильность ввода логина либо пароля" })
	// 			}
	// 			console.log(data)

	// 			setSubmitting(false);
	// 		} catch (error) {
	// 			// alert(error)
	// 			console.log(error)
	// 		}
	// 	})()
	// },
	displayName: 'BasicForm',
})(AuthorizePage)

// {
// 	isAdmin: false
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODAsImlhdCI6MTY1MTE0OTMzOX0.Jn5THBh-IrydiBPifHVPjOi4mtg26JsAYzpHEleL_FY"
// }