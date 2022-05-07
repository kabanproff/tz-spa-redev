import React from 'react'
import { Form, Input, Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { getUser } from '../../../redux/reducers/userAuthSlice';

import AuthImage from '../../../assets/img/AuthorizeImage'

import './AuthorizePage.less'
import Logo from '../../Logo/Logo';
import { useAuth } from '../../../hooks/useAuth';

const { Title } = Typography;

function AuthorizePage({
	values,
	errors,
	handleChange,
	handleSubmit,
	dirty,
}) {

	const dispatch = useDispatch()
	const { loading } = useAuth()

	return (
		<div className={'authorize-wrapper'}>
			<header className={'header'}>
				<div className={'logo'}>
					<Logo />
				</div>
			</header>
			<div className={'content'}>
				<Title level={1}>Вход в личный кабинет</Title>
				<div className={'wrapper__form'}>
					<Form
						name="normal_login"
						className="login-form"
						layout="vertical"
						onSubmit={handleSubmit}
					>
						<Form.Item
							label="Логин:"
							validateStatus={
								!dirty ? ''
									: errors.login ? 'error' : 'success'
							}
							hasFeedback
							help={errors.login}
						>
							<Input
								name='login'
								value={values.login}
								onChange={handleChange}
								placeholder='E-Mail'
							/>
						</Form.Item>

						<Form.Item
							validateStatus={
								!dirty ? ''
									: errors.password ? 'error' : 'success'
							}
							hasFeedback
							help={errors.password}
							className={'form__item-castom'}
							label={
								<>
									<span>Пароль:</span>
									<a className="login-form-forgot" href="#1">
										Забыли пароль?
									</a>
								</>
							}

						>
							<Input.Password
								name='password'
								onChange={handleChange}
								value={values.password}
								placeholder='Пароль'

							/>
						</Form.Item>

						<Form.Item

						>
							<Button
								className="login-form-button"
								type="primary"
								loading={loading}
								onClick={() => {
									dispatch(getUser(values))
								}}

							>
								Войти
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
			<div className={'image__auth'}>
				<AuthImage />
			</div>
		</div >
	)


};

export default AuthorizePage
