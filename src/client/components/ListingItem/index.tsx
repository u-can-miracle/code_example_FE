import * as React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import DeleteIcon from '../DeleteIcon'
import RestrictedByRole from '../RestrictedByRole'

import {
  IEntityToCRUDTypes,
} from '../../../../Appearance_roles/src/interface'

import getTranslationById from '../../services/getTranslationById'

interface IProps {
  name: string
  entityToCRUD: IEntityToCRUDTypes
  toEditLink: string
  onBeforeNavigate?: () => void
  onRemove: () => void
}

const ListingItem = (props: IProps) => {
  const {
    name,
    entityToCRUD,
    toEditLink,
    onRemove,
    onBeforeNavigate,
  } = props

  function getEditButton() {
    return (
      <Link
        onClick={() => {
          if(onBeforeNavigate){
            onBeforeNavigate()
          }
        }}
        className="listing-item-edit"
        to={toEditLink}
      >
        <Icon
          type="edit"
        />
      </Link>
    )
  }

  function getDeleteButton() {
    return (
      <DeleteIcon
        title={`${getTranslationById('deletePreText')} ${getTranslationById(entityToCRUD)}?`}
        onDelete={onRemove}
      />
    )
  }

  return (
    <div className="listing-item">
      <div className="listing-item-name">{name}</div>
      <div className="listing-item-actions">

        <RestrictedByRole
          entityToCRUD={entityToCRUD}
          permission={'update'}
          allowComp={getEditButton()}
        />

        <RestrictedByRole
          entityToCRUD={entityToCRUD}
          permission={'delete'}
          allowComp={getDeleteButton()}
        />
      </div>
    </div>
  )
}

export default ListingItem
