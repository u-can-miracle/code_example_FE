import * as React from 'react'
import { Form, Input, Icon, AutoComplete, Button } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

import { ICompanyCreateRequest } from '../../../../../interfaces/contact'
import getTranslationById from '../../../../../services/getTranslationById'
import {
  validateCompanyName,
  validateCountry,
  validateCity,
  validateEmail,
  validatePhone,
} from '../../../../../services/validators'
import {
  countriesDataSource,
  getCitiesByCountryName
} from '../../../../../services/location'

interface IProps extends FormComponentProps, ICompanyCreateRequest {
  submitText: string
  sendRequest: (params: ICompanyCreateRequest) => void
  isDisabled: boolean
}
const CompanyForm = ({
  name,
  country,
  city,
  email,
  address,
  phone,
  submitText,
  sendRequest,
  isDisabled = false,
  form: {
    getFieldValue,
    getFieldDecorator,
    validateFields,
    setFieldsValue,
  }
}: IProps) => {
  const selectedCountry = getFieldValue('country')
  const filterOption = (inputValue, option) => {
    const isMatched = option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    return isMatched
  }

  const handleSubmit = e => {
    e.preventDefault()
    validateFields((err, values: ICompanyCreateRequest) => {
      if (!err) {
        sendRequest(values)
      }
    })
  }

  return <Form
    className={classNames(
      'profile--designer-info',
      { 'disabled-inputs-wrapper': isDisabled }
    )}
    onSubmit={handleSubmit}
  >
    <Form.Item>
      {getFieldDecorator('name', {
        initialValue: name,
        rules: [
          {
            required: true,
            message: getTranslationById('required'),
          },
          {
            validator: validateCompanyName,
          },
        ],
        validateTrigger: ['onBlur'],
      })(
        <Input
          disabled={isDisabled}
          placeholder={getTranslationById('companyNamePlaceholder')}
        />
      )}
    </Form.Item>

    <Form.Item>
      {getFieldDecorator('country', {
        initialValue: country,
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
          disabled={isDisabled}
          dataSource={countriesDataSource}
          placeholder={getTranslationById('countryPlaceholder')}
          onChange={countryName => setFieldsValue({ country: countryName })}
          filterOption={filterOption}
        />
      )}
    </Form.Item>

    <Form.Item>
      {getFieldDecorator('city', {
        initialValue: city,
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
          disabled={isDisabled}
          dataSource={selectedCountry && getCitiesByCountryName(selectedCountry)}
          placeholder={getTranslationById('cityPlaceholder')}
          onChange={cityName => setFieldsValue({ city: cityName })}
          filterOption={filterOption}
        />
      )}
    </Form.Item>

    <Form.Item>
      {getFieldDecorator('address', {
        initialValue: address,
        rules: [
          {
            message: getTranslationById('required'),
          },
        ],
        validateTrigger: ['onBlur'],
      })(
        <Input.TextArea
          disabled={isDisabled}
          placeholder={getTranslationById('companyAddress')}
        />
      )}
    </Form.Item>

    <Form.Item>
      {getFieldDecorator('email', {
        initialValue: email,
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
          disabled={isDisabled}
          prefix={<Icon
            type="inbox"
            style={{ color: 'rgba(0,0,0,.25)' }}
          />}
          placeholder={getTranslationById('emailPlaceholder')}
        />
      )}
    </Form.Item>

    <Form.Item>
      {getFieldDecorator('phone', {
        initialValue: phone,
        rules: [
          {
            required: true,
            message: getTranslationById('required'),
          },
          {
            validator: validatePhone,
          },
        ],
        validateTrigger: ['onBlur'],
      })(
        <Input
          disabled={isDisabled}
          prefix={<Icon
            type="phone"
            style={{ color: 'rgba(0,0,0,.25)' }}
          />}
          placeholder={getTranslationById('phonePlaceholder')}
        />
      )}
    </Form.Item>

    {!isDisabled && (
      <Button
        htmlType="submit"
      >
        <FormattedMessage id={submitText} />
      </Button>
    )}
  </Form>
}

export default CompanyForm
