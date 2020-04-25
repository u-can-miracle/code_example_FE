import { ITreeCategory, ICategory } from '../../interfaces/category'

export default function buildNestedTree(categoriesList: ICategory[]): ITreeCategory[] {
  const children: ICategory[] = categoriesList.filter(c => c.parentCategoryId)
  const roots: ICategory[] = categoriesList.filter(c => !c.parentCategoryId)
  const treeRoots: ITreeCategory[] = roots.map(r => ({
    ...r,
    title: r.name,
    key: r.id,
    children: [],
  }))

  const childrenTree: ITreeCategory[][] = getNestedChildren(treeRoots, children)

  for(let i = 0; i < roots.length; i++){
    if(childrenTree[i].length){
      treeRoots[i].children = childrenTree[i]
    }
  }

  return treeRoots
}

function getNestedChildren(parents: ICategory[], items: ICategory[]): ITreeCategory[][] {
  const children: ITreeCategory[][] = []

  for(let parentIndex = 0; parentIndex < parents.length; parentIndex++){
    const parent = parents[parentIndex]
    children[parentIndex] = []

    for(let i = 0; i < items.length; i++){
      const item = items[i]
      const treeItem = {
        ...item,
        title: item.name,
        key: item.id,
        children: [],
      }

      if(item.parentCategoryId === parent.id){
        items.splice(i, 1)
        i--
        children[parentIndex].push(treeItem)
      }
    }
  }

  for(let parentIndex = 0; parentIndex < parents.length; parentIndex++){
    const subChildren = children[parentIndex]

    // get children for parent
    if(subChildren.length && items.length){
      const childrenOfParentsChildren = getNestedChildren(subChildren, items)
      for(let i = 0; i < subChildren.length; i++){
        if(childrenOfParentsChildren[i].length){
          subChildren[i].children = childrenOfParentsChildren[i]
        }
      }
    }
  }

  return children
}
