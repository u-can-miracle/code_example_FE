import { connect } from 'react-redux'
import { Form } from 'antd'

import CompanyMembers from './CompanyMembers'
import { сompanyMembersSelector } from '../../../../redux/user/selector'
import {
  inviteToCompanyRequest,
  changeUserStatusRequest,
  IStatusChangeParams,
  deleteUserRequest,
} from '../../../../redux/user/actions'

const mapStateToProps = state => ({
  members: сompanyMembersSelector(state)
})

const mapDispatchToProps = dispatch => ({
  invite: (email: string) => dispatch(inviteToCompanyRequest(email)),
  chnageUserStatus: (params: IStatusChangeParams) => dispatch(changeUserStatusRequest(params)),
  deleteUser: (id: number) => dispatch(deleteUserRequest(id)),
})

const WithForm = Form.create({ name: 'invite-form' })(CompanyMembers)
export default connect(mapStateToProps, mapDispatchToProps)(WithForm)
