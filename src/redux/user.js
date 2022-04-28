import axios from "axios";

export const authorization = (values, setErrors, setSubmitting,) => {
	return async dispatch => {
		try {
			console.log(values)

			const { data } = await axios.post('https://typ-back.herokuapp.com/api/auth/login', values)
			if (data.message) {
				setErrors({ login: "Проверьте правильность ввода логина либо пароля" })
			}
			console.log(data)

			setSubmitting(false);
		} catch (error) {
			alert(error)
			console.log(error)
		}
	}
}