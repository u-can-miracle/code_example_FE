import { IPaginationOptional } from './common'

export interface ICategoryBase {
  name: string,
  priority: number,
  parentCategoryId: number | null,
}

export interface ICategory extends ICategoryBase {
  id: number
  companyId: number | null
  userId: number
  isActive: boolean
}

export interface ITreeCategory extends ICategory {
  title: string
  key: number
  children: ITreeCategory[]
}

export interface IProductPagination extends IPaginationOptional {
  categoryId: number | null
  name: string
}
