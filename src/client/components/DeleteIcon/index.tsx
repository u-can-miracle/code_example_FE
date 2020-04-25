import * as React from 'react'
import { Modal, Icon } from 'antd'

import getTranslationById from '../../services/getTranslationById'

const { confirm } = Modal

interface IProps {
  title: string | React.ReactChild
  onDelete: () => void
}

function DeleteIcon({
  title,
  onDelete,
}: IProps) {
  function showConfirm() {
    confirm({
      title,
      okText: getTranslationById('okText'),
      cancelText: getTranslationById('cancelText'),
      onOk() {
        onDelete()
      },
    })
  }

  return (
    <Icon
      type="delete"
      onClick={showConfirm}
    />
  )
}

export default DeleteIcon
