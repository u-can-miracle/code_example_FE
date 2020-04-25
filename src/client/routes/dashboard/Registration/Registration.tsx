import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { omit } from 'lodash'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  AutoComplete,
} from 'antd'
import { FormComponentProps } from 'antd/es/form'

import { IRegistration } from '../../../redux/user/actions'
import getTranslationById from '../../../services/getTranslationById'
import { countriesDataSource, getCitiesByCountryName } from '../../../services/location'
import {
  validateUserName,
  validateEmail,
  validateCompanyName,
  validateCountry,
  validateCity,
} from '../../../services/validators'

interface IFormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
  companyName: string
  country: string
  city: string
}

interface IProps extends FormComponentProps {
  isLogged: boolean
  invitedEmail: string
  registration: (data: IRegistration) => void
}
const Registration = ({
  registration,
  isLogged,
  invitedEmail,
  form: {
    getFieldValue,
    getFieldDecorator,
    setFieldsValue,
    validateFields,
  }
}: IProps) => {
  const selectedCountry = getFieldValue('country')
  const initialState = {
    isCreateCompany: false,
  }
  const [state, setState] = React.useState(initialState)
  const { isCreateCompany } = state

  const handleSubmit = e => {
    e.preventDefault()
    validateFields((err, values: IFormValues) => {
      if (!err) {
        const data = omit(values, ['confirmPassword'])
        registration(data)
      }
    })
  }

  const validatePass = (rule, value, callback) => {
    const passConfirmValue = getFieldValue('confirmPassword')

    // validateFields(['confirmPassword'], { force: true })

    if (value.length <= 4){
      callback(getTranslationById('passwordErrLength'))
    } else if (value && value !== passConfirmValue) {
      callback(getTranslationById('passwordErrEqual'))
    }

    callback()
  }

  const validatePassConfirm = (rule, value, callback) => {
    const passValue = getFieldValue('password')

    validateFields(['password'], { force: true })

    if (value.length <= 4){
      callback(getTranslationById('passwordErrLength'))
    } else if (value && value !== passValue) {
      callback(getTranslationById('passwordErrEqual'))
    }

    callback()
  }

  const filterOption = (inputValue, option) => {
    return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
  }

  if(isLogged){
    return <Redirect to="/dashboard"/>
  } else {
    return (
      <Form
        className="dashboard-registration"
        onSubmit={handleSubmit}
      >
        <Form.Item>
          {getFieldDecorator('username', {
            validateFirst: true,
            rules: [
              {
                required: true,
                message: getTranslationById('required'),
              },
              {
                validator: validateUserName,
              },
            ],
            validateTrigger: ['onBlur'],
          })(
            <Input
              prefix={<Icon
                type="user"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              placeholder={getTranslationById('regPlaceholderName')}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('email', {
            initialValue: invitedEmail,
            validateFirst: true,
            rules: [
              {
                required: true,
                message: getTranslationById('required'),
              },
              {
                validator: validateEmail,
              },
            ],
            validateTrigger: ['onBlur'],
          })(
            <Input
              prefix={<Icon
                type="inbox"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              placeholder={getTranslationById('emailPlaceholder')}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('password', {
            validateFirst: true,
            rules: [
              {
                required: true,
                message: getTranslationById('required'),
              },
              {
                validator: validatePass,
              },
            ],
            validateTrigger: ['onBlur'],
          })(
            <Input
              type="password"
              prefix={<Icon
                type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              placeholder={getTranslationById('passwordPlaceholder')}
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('confirmPassword', {
            validateFirst: true,
            rules: [
              {
                required: true,
                message: getTranslationById('required'),
              },
              {
                validator: validatePassConfirm
              },
            ],
            validateTrigger: ['onBlur', 'onChange'],
          })(
            <Input
              type="password"
              prefix={<Icon
                type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              placeholder={getTranslationById('passwordConfirmPlaceholder')}
            />
          )}
        </Form.Item>

        {
          isCreateCompany && (
            <>
              <Form.Item>
                {getFieldDecorator('companyName', {
                  validateFirst: true,
                  rules: [
                    {
                      required: true,
                      message: getTranslationById('required'),
                    },
                    {
                      validator: validateCompanyName
                    },
                  ],
                  validateTrigger: ['onBlur'],
                })(
                  <Input
                    placeholder={getTranslationById('companyNamePlaceholder')}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('country', {
                  validateFirst: true,
                  rules: [
                    {
                      required: true,
                      message: getTranslationById('required'),
                    },
                    {
                      validator: validateCountry
                    },
                  ],
                  validateTrigger: ['onBlur'],
                })(
                  <AutoComplete
                    dataSource={countriesDataSource}
                    placeholder={getTranslationById('countryPlaceholder')}
                    onChange={country => {
                      setFieldsValue({ country })
                    }}
                    filterOption={filterOption}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('city', {
                  validateFirst: true,
                  rules: [
                    {
                      required: true,
                      message: getTranslationById('required'),
                    },
                    {
                      validator: validateCity(selectedCountry)
                    },
                  ],
                  validateTrigger: ['onBlur'],
                })(
                  <AutoComplete
                    dataSource={selectedCountry && getCitiesByCountryName(selectedCountry)}
                    placeholder={getTranslationById('cityPlaceholder')}
                    onChange={city => {
                      setFieldsValue({ city })
                    }}
                    filterOption={filterOption}
                  />
                )}
              </Form.Item>
            </>
          )
        }

        <div className="dashboard-registration--submit-wrapper">
          <Button
            htmlType="submit"
          >
            <FormattedMessage id="regSubmit" />
          </Button>

          {!invitedEmail && (
            <Checkbox
              className="dashboard-registration--company-checkbox"
              checked={isCreateCompany}
              onChange={e => setState({ isCreateCompany: e.target.checked })}
            >
              <FormattedMessage id="regCompany" />
            </Checkbox>
          )}
        </div>

        <p className="form-bottom-text">
          <FormattedMessage id="regHaveAccount" />
          &nbsp;
          <Link to="/dashboard/login">
            <FormattedMessage id="regToLogin" />
          </Link>
        </p>
      </Form>
    )
  }
}

export default Registration
