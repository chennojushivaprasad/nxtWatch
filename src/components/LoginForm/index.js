import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect, useHistory} from 'react-router-dom'

import {
  AppContainer,
  FormContainer,
  LoginLogo,
  InputContainer,
  LoginButton,
  SubmitError,
  InputLabel,
  UserInput,
  CheckboxContainer,
  Checkbox,
  ShowPassword,
} from './styledComponents'

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  })

  const history = useHistory()

  const onChangeHandler = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const toggleShowPassword = () => {
    setFormData(prevState => ({
      ...formData,
      showPassword: !prevState.showPassword,
    }))
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    setFormData({
      ...formData,
      showSubmitError: true,
      errorMsg,
    })
  }

  const submitForm = async event => {
    event.preventDefault()
    const {username, password} = formData
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const renderUsernameField = () => (
    <>
      <InputLabel htmlFor="username">USERNAME</InputLabel>
      <UserInput
        type="text"
        id="username"
        value={formData.username}
        name="username"
        onChange={onChangeHandler}
        placeholder="Username"
      />
    </>
  )

  const renderPasswordField = () => {
    const inputType = formData.showPassword ? 'text' : 'password'
    return (
      <>
        <InputLabel htmlFor="password">PASSWORD</InputLabel>
        <UserInput
          type={inputType}
          id="password"
          value={formData.password}
          name="password"
          onChange={onChangeHandler}
          placeholder="Password"
        />
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id="checkbox"
            onChange={toggleShowPassword}
          />
          <ShowPassword htmlFor="checkbox">Show Password</ShowPassword>
        </CheckboxContainer>
      </>
    )
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <AppContainer>
      <FormContainer onSubmit={submitForm}>
        <LoginLogo
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />
        <InputContainer>{renderUsernameField()}</InputContainer>
        <InputContainer>{renderPasswordField()}</InputContainer>
        <LoginButton type="submit">Login</LoginButton>
        {formData.showSubmitError && (
          <SubmitError>*{formData.errorMsg}</SubmitError>
        )}
      </FormContainer>
    </AppContainer>
  )
}

export default LoginForm
