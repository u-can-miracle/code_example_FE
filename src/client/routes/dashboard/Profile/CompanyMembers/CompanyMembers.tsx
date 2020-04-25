import * as React from 'react'
import {
  Input,
  Button,
  Form,
  Icon,
  Checkbox,
} from 'antd'
import { FormComponentProps } from 'antd/es/form'
import { FormattedMessage } from 'react-intl'

import { IProfile } from '../../../../interfaces/user'
import getTranslationById from '../../../../services/getTranslationById'
import { validateEmail } from '../../../../services/validators'
import RestrictedByRole from '../../../../components/RestrictedByRole'
import DeleteIcon from '../../../../components/DeleteIcon'
import PaginationTable from '../../../../components/PaginationTable'
import UpdateRoles from '../common/UpdateRoles'
import { IStatusChangeParams } from '../../../../redux/user/actions'

interface IValues {
  email: string
}
interface IProps extends FormComponentProps {
  members: IProfile[]
  invite: (email: string) => void
  chnageUserStatus: (params: IStatusChangeParams) => void
  deleteUser: (id: number) => void
}

const CompanyMembers = ({
  members,
  invite,
  chnageUserStatus,
  deleteUser,
  form: {
    getFieldDecorator,
    validateFields,
  }
}: IProps) => {
  const columns = [
    {
      title: getTranslationById('namePlaceholder'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: getTranslationById('emailPlaceholder'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: getTranslationById('phonePlaceholder'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: getTranslationById('rolePlaceholder'),
      dataIndex: 'role',
      key: 'role',
      render: (text: string, member: IProfile, index: number) => (
        <RestrictedByRole
          entityToCRUD="user"
          permission="assignRole"
          member={member}
          allowComp={
            <UpdateRoles
              userId={member.id}
              memberRole={member.role}
            />
          }
          notAllowComp={<div>{getTranslationById(member.role)}</div>}
        />
      )
    },
    {
      title: getTranslationById('status'),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text: string, member: IProfile, index: number) => (
        <RestrictedByRole
          entityToCRUD="user"
          permission="update"
          member={member}
          allowComp={
            <Checkbox
              onChange={e => chnageUserStatus({ userId: member.id, isActive: e.target.checked })}
              checked={member.isActive}
            >
              {member.isActive ? getTranslationById('statusActive') : getTranslationById('statusDisabled')}
            </Checkbox>
          }
          notAllowComp={(
            <>{
              member.isActive ? getTranslationById('statusActive') : getTranslationById('statusDisabled')
            }</>
          )}
        />
      )
    },
    {
      render: (text: string, member: IProfile, index: number) => (
        <RestrictedByRole
          entityToCRUD="user"
          permission="delete"
          member={member}
          allowComp={
            <DeleteIcon
              title={getTranslationById('deleteUser')}
              onDelete={() => deleteUser(member.id)}
            />
          }
        />
      )
    },
  ]
  let inviteForm

  const handleSubmit = e => {
    e.preventDefault()
    validateFields((err, values: IValues) => {
      if (!err) {
        invite(values.email)
      }
    })
  }

  function getInvitationForm() {
    return (
      <Form
        className="company-members"
        onSubmit={handleSubmit}
      >
        <Form.Item
          className="company-members--invite-block"
        >
          {getFieldDecorator('email', {
            validateFirst: true,
            normalize: (value = '') => value.trim(),
            rules: [
              {
                required: true,
                message: getTranslationById('required'),
              },
              {
                validator: validateEmail,
              },
            ],
          })(
            <Input
              className="company-members--invite-field"
              prefix={<Icon
                type="inbox"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              placeholder={getTranslationById('emailPlaceholder')}
            />
          )}
        </Form.Item>

        <Button
          htmlType="submit"
        >
          <FormattedMessage id="inviteMemberText" />
        </Button>
      </Form>
    )
  }

  function getFormSingletone() {
    if (!inviteForm) {
      inviteForm = getInvitationForm()
    }

    return inviteForm
  }

  return (
    <>
      <RestrictedByRole
        entityToCRUD="user"
        permission="invite"
        allowComp={getFormSingletone()}
      />

      <PaginationTable
        rowKey="id"
        className="company-members--members-list"
        columns={columns}
        dataSource={members}
      />
    </>
  )
}

export default CompanyMembers
