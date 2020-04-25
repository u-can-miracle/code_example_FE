import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { Redirect } from 'react-router-dom'
import {
   Button,
} from 'antd'

const Confirm = ({ isRegistationConfirmation, disableRegisteredProcess }) => {
  return (
    <div className="confirm-wrapper">
      {
        isRegistationConfirmation ? (
          <div>
            <h4 className="confirm-wrapper-title">
              <FormattedMessage id="confirmCongrats" />
            </h4>
            <Button
              className="theme-btn"
              onClick={() => disableRegisteredProcess()}
            >
              <FormattedMessage id="confirmStart" />
            </Button>
          </div>
        )
        : (
          <Redirect to="/dashboard/categories"/>
        )
      }
    </div>
  )
}

export default Confirm
