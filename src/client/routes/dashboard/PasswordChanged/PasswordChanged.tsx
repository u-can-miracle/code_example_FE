import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router-dom'
import {
   Button,
} from 'antd'

const Confirm = ({ isChangingPwd, disableChangePWdProcess }) => {
  return (
    <div className="confirm-wrapper">
      {
        isChangingPwd ? (
          <div>
            <h4 className="confirm-wrapper-title">
              <FormattedMessage id="resetPwdCongrats" />
            </h4>
            <Button
              className="theme-btn"
              onClick={() => disableChangePWdProcess()}
            >
              <FormattedMessage id="confirmStart" />
            </Button>
          </div>
        )
        : (
          <Redirect to="/dashboard"/>
        )
      }
    </div>
  )
}

export default Confirm
