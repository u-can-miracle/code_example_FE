import { connect } from 'react-redux'
import { Form } from 'antd'

import DesignerProfile from './DesignerProfile'

import {
  userIdSelector,
  userNameSelector,
  userEmailSelector,
  userPhoneSelector,
} from '../../../../redux/user/selector'
import { designerProfileUpdateRequest } from '../../../../redux/user/actions'
import { IProfile } from '../../../../interfaces/user'

const mapStateToProps = state => ({
  id: userIdSelector(state),
  name: userNameSelector(state),
  email: userEmailSelector(state),
  phone: userPhoneSelector(state),
})

const mapDispatchToProps = dispatch => ({
  updateProfile: (params: IProfile) => dispatch(designerProfileUpdateRequest(params))
})

const WithForm = Form.create({
  name: 'designer-profile',
})(DesignerProfile)

export default connect(mapStateToProps, mapDispatchToProps)(WithForm)
