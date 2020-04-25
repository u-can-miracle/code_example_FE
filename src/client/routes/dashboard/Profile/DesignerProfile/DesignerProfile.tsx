import * as React from 'react'
import { Form, Input, Icon, Button } from 'antd'
import { FormattedMessage } from 'react-intl'
import { FormComponentProps } from 'antd/es/form'

import { IProfile } from '../../../../interfaces/user'
import getTranslationById from '../../../../services/getTranslationById'
import {
  validateUserName,
  validatePhone,
} from '../../../../services/validators'

export interface IProps extends FormComponentProps, IProfile {
  updateProfile: (params: IProfile) => void
}

const DesignerProfile = ({
  id,
  name,
  email,
  phone,
  updateProfile,
  form: {
    getFieldDecorator,
    validateFields,
  }
}: IProps) => {
  const handleSubmit = e => {
    e.preventDefault()
    validateFields((err, values: IProfile) => {
      if (!err) {
        // send request
        updateProfile({ id, ...values, email })
      }
    })
  }

  return <Form
    className="profile--designer-info"
    onSubmit={handleSubmit}
  >
    <Form.Item>
      {getFieldDecorator('name', {
        initialValue: name,
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
      <Input
        className="profile--email"
        disabled
        name="email"
        value={email}
        prefix={<Icon
          type="inbox"
          style={{ color: 'rgba(0,0,0,.25)' }}
        />}
        placeholder={getTranslationById('regPlaceholderName')}
      />
    </Form.Item>

    <Form.Item>
      {getFieldDecorator('phone', {
        initialValue: phone,
        validateFirst: true,
        rules: [
          {
            validator: validatePhone,
          },
        ],
        validateTrigger: ['onBlur'],
      })(
        <Input
          prefix={<Icon
            type="phone"
            style={{ color: 'rgba(0,0,0,.25)' }}
          />}
          placeholder={getTranslationById('profilePhonePlaceholder')}
        />
      )}
    </Form.Item>

    <Button
      htmlType="submit"
    >
      <FormattedMessage id="profileUpdate" />
    </Button>
  </Form>
}

export default DesignerProfile
