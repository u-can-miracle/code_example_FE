import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Formik } from 'formik'
import {
   Form, Icon, Input, Button,
} from 'antd'

import { isEmail } from '../../../services/validators'
import { removeEmptyStringKeys } from '../../../services/utils'
import getTranslationById from '../../../services/getTranslationById'

interface IFormValues {
  email: string
  password: string
}

function validate(values: IFormValues) {
  const errors = {
    email: '',
    password: '',
  }

  if (!values.email) {
    errors.email = getTranslationById('required')
  } else if (!isEmail(values.email)) {
    errors.email = getTranslationById('emailInvalid')
  }

  if (!values.password) {
    errors.password = getTranslationById('required')
  } else if (values.password.length <= 4){
    errors.password = getTranslationById('passwordErrLength')
  }

  return removeEmptyStringKeys(errors)
}

const initialValues: IFormValues = {
  email: '',
  password: '',
}

const DashboardHome = ({ login, isLogged }) => {
  if(isLogged){
    return <Redirect to="/dashboard"/>
  } else {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const { email, password } = values
          login(email, password)
          actions.setSubmitting(false)
        }}
        validate={validate}
        render={({
          values,
          errors,
          dirty,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValidating,
        }) => {

          const getStatus = (error, touch) => {
            return error && touch ? 'error' : ''
          }

          const getHelpMsg = (error, touch) => {
            return error && touch ? error : ''
          }

          return (
            <form
              onSubmit={handleSubmit}
              className="dashboard-content"
            >
              <div className="padding-wrapper">
                <Form.Item
                  validateStatus={getStatus(errors.email, touched.email)}
                  help={getHelpMsg(errors.email, touched.email)}
                >
                  <Input
                    prefix={<Icon
                      type="inbox"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />}
                    placeholder={getTranslationById('emailPlaceholder')}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                <Form.Item
                  validateStatus={getStatus(errors.password, touched.password)}
                  help={getHelpMsg(errors.password, touched.password)}
                >
                  <Input
                    type="password"
                    prefix={<Icon
                      type="lock"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />}
                    placeholder={getTranslationById('passwordPlaceholder')}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </div>

              {status && status.msg && <div>{status.msg}</div>}

              <Button
                htmlType="submit"
                disabled={isSubmitting}
              >
                <FormattedMessage id="loginSubmit" />
              </Button>
              <p className="form-bottom-text">
                <FormattedMessage id="loginNoAccount" />
                &nbsp;
                <Link to="/dashboard/registration">
                  <FormattedMessage id="loginRegister" />
                </Link>
              </p>
              <p>
                <Link to="/dashboard/reset-password">
                  <FormattedMessage id="loginForgotPwd" />
                </Link>
              </p>
            </form>
          )
        }}
      />
    )
  }
}

export default DashboardHome
