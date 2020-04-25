import * as  React from 'react'
import { Tree as AntTree } from 'antd'

import { ITreeCategory } from '../../interfaces/category'

const { TreeNode } = AntTree

interface IProps {
  selectedKeys: string[]
  treeData: ITreeCategory[]
  className: string
  onSelect: (selectedKeys: string[]) => void
}

function Tree(props: IProps) {
  const { selectedKeys, treeData, className, onSelect } = props

  function renderTreeNodes(categories: ITreeCategory[]) {
    return categories.map(item => {
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={String(item.key)}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }

      return <TreeNode
        title={item.title}
        key={String(item.key)}
      />
    })
  }

  return (
    <AntTree
      className={className}
      blockNode
      selectedKeys={selectedKeys}
      onSelect={onSelect}
    >
      {renderTreeNodes(treeData)}
    </AntTree>
  )
}

export default Tree
