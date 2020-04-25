import { connect } from 'react-redux'
import { Form } from 'antd'

import CompanyForm from '../CompanyForm'
import { companyUpdateRequest } from '../../../../../redux/user/actions'
import { ICompanyCreateRequest } from '../../../../../interfaces/contact'
import {
  companyNameSelector,
  firstCompanyContactsSelector,
  isCompanyEditAllowedSelector
} from '../../../../../redux/user/selector'

const WithForm = Form.create({
  name: 'company-form-update',
})(CompanyForm)

const mapStateToProps = state => ({
  name: companyNameSelector(state),
  country: firstCompanyContactsSelector(state).country,
  city: firstCompanyContactsSelector(state).city,
  address: firstCompanyContactsSelector(state).address,
  email: firstCompanyContactsSelector(state).email,
  phone: firstCompanyContactsSelector(state).phone,
  submitText: 'companyUpdate',
  isDisabled: !isCompanyEditAllowedSelector(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  sendRequest: (params: ICompanyCreateRequest) => dispatch(companyUpdateRequest(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithForm)
