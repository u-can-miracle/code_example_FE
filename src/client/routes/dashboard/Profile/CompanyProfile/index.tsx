import { connect } from 'react-redux'

import CompanyProfile from './CompanyProfile'

import {
  isCompanyExistsSelector,
  companyNameSelector,
  companyContactsSelector,
} from '../../../../redux/user/selector'

import { ICompanyContact } from '../../../../interfaces/contact'

export interface IStateProps {
  isCompanyExists: boolean
  companyName: string
  contacts: ICompanyContact[]
}

const mapStateToProps = state => ({
  isCompanyExists: isCompanyExistsSelector(state),
  companyName: companyNameSelector(state),
  contacts: companyContactsSelector(state),
})

const mapDispatchToProps = dispatch => ({

})

export default connect<IStateProps, {}, {}>(mapStateToProps, {})(CompanyProfile)
