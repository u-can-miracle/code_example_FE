import * as React from 'react'
import {
  Table,
} from 'antd'

import { DEFAULT_PAGINATION_COUNT } from '../../constants'

interface IProps {
  rowKey: string
  className: string
  columns: any[]
  dataSource: any[],
  paginationLimit?: number
}

function PaginationTable({
  rowKey,
  className,
  columns,
  dataSource,
  paginationLimit = DEFAULT_PAGINATION_COUNT,
}: IProps) {

  const pagination = dataSource.length > paginationLimit ? {
    pageSize: paginationLimit,
  } : false

  return (
    <Table
      rowKey={rowKey}
      className={className}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
    />
  )
}

export default PaginationTable
