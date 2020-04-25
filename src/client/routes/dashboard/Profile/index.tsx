import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tabs, Alert } from 'antd'

import DesignerProfile from './DesignerProfile'
import CompanyProfile from './CompanyProfile'
import CompanyMembers from './CompanyMembers'
import PaidPlans from './PaidPlans'
import { isCompanyCreatedSelector } from '../../../redux/user/selector'
import {
  isPlanDateExpiredSelector,
  willExpireSoonSelector,
} from '../../../redux/plan/selector'
import getTranslationById from '../../../services/getTranslationById'

const { TabPane } = Tabs

interface IProps {
  isCompanyCreated: boolean
  isPlanExpired: boolean
  willExpireSoon: boolean
}

const Profile = ({
  isCompanyCreated,
  isPlanExpired,
  willExpireSoon,
}: IProps) => {
  const descriptionExpire = isPlanExpired && (
    <div>
      {getTranslationById('planExpDesStart')} <Link to="/dashboard/plans">
        {getTranslationById('planDesEnd')}
      </Link>
    </div>
  )
  const descriptionInfo = willExpireSoon && (
    <div>
      {getTranslationById('planExpSoonDesStart')} <Link to="/dashboard/plans">
        {getTranslationById('planDesEnd')}
      </Link>
    </div>
  )

  return (
    <div className="profile">
      {
        isPlanExpired && (
          <Alert
            className="profile--plan-alert"
            message={getTranslationById('planExpired')}
            description={descriptionExpire}
            type="warning"
          />
        )
      }
      {
        willExpireSoon && (
          <Alert
            className="profile--plan-alert"
            message={getTranslationById('planExpSoonTitle')}
            description={descriptionInfo}
            type="info"
          />
        )
      }
      <Tabs type="card">
        <TabPane tab={getTranslationById('myProfile')} key="1">
          <DesignerProfile />
        </TabPane>
        <TabPane tab={getTranslationById('companyInfo')} key="2">
          <CompanyProfile />
        </TabPane>
        {isCompanyCreated && (
          <TabPane
            tab={getTranslationById('companyMembers')}
            key="3"
          >
            <CompanyMembers />
          </TabPane>
          )
        }
        <TabPane tab={getTranslationById('plans')} key="4">
          <PaidPlans />
        </TabPane>
      </Tabs>
    </div>
  )
}

const mapStateToProps = state => ({
  isPlanExpired: isPlanDateExpiredSelector(state),
  isCompanyCreated: isCompanyCreatedSelector(state),
  willExpireSoon: willExpireSoonSelector(state),
})

export default connect(mapStateToProps, null)(Profile)
