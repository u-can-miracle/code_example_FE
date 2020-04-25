import { connect } from 'react-redux'
import { Form } from 'antd'

import CompanyForm from '../CompanyForm'
import { companyCreateRequest } from '../../../../../redux/user/actions'
import { ICompanyCreateRequest } from '../../../../../interfaces/contact'

const WithForm = Form.create({
  name: 'company-form-create',
})(CompanyForm)

const mapStateToProps = state => ({
  name: '',
  country: '',
  city: '',
  address: '',
  email: '',
  phone: '',
  submitText: 'companyCreate',
})

const mapDispatchToProps = (dispatch, props) => ({
  sendRequest: (params: ICompanyCreateRequest) => dispatch(companyCreateRequest(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WithForm)
