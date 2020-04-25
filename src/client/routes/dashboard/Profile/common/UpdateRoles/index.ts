import { connect } from 'react-redux'

import UpdateRoles from './UpdateRoles'
import { allRolesSelector, userRoleSelector } from '../../../../../redux/user/selector'
import { changeUserRoleRequest, IRoleUpdate } from '../../../../../redux/user/actions'

const mapStateToProps = state => ({
  allRoles: allRolesSelector(),
  currentUserRole: userRoleSelector(state),
})

const mapDispatchToProps = dispatch => ({
  changeRole: (params: IRoleUpdate) => dispatch(changeUserRoleRequest(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRoles)
