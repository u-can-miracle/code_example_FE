import { IProduct, IAsset } from '../../interfaces/product'
import { IProductPagination } from '../../interfaces/category'
import { convertAntFileToAsset } from '../../services/formatters'
import { IUploadRequest } from '../../components/ProductForm'
import { PAGINATION_LIMIT } from '../../constants/product'

export const CLEAR_FORM = 'CLEAR_FORM'
export const clearForm = () => ({
  type: CLEAR_FORM
})

export const UPLOAD_MODEL_REQUEST = 'UPLOAD_MODEL_REQUEST'
export const uploadModelRequest = (params: IUploadRequest) => ({
  type: UPLOAD_MODEL_REQUEST,
  payload: {
    file: params.file,
    onSuccess: params.onSuccess,
    onError: params.onError,
  }
})

export const UPLOAD_MODEL_SUCCESS = 'UPLOAD_MODEL_SUCCESS'
export const uploadModelSuccess = (params: IAsset) => ({
  type: UPLOAD_MODEL_SUCCESS,
  payload: {
    location: params.location,
    mimetype: params.mimetype,
    originalname: params.originalname,
    key: params.key,
  }
})

export const REMOVE_MODEL = 'REMOVE_MODEL'
export const removeModel = () => ({
  type: REMOVE_MODEL,
})

// texture
export const UPLOAD_TEXTURE_REQUEST = 'UPLOAD_TEXTURE_REQUEST'
export const uploadTextureRequest = (params: IUploadRequest) => ({
  type: UPLOAD_TEXTURE_REQUEST,
  payload: {
    file: params.file,
    onSuccess: params.onSuccess,
    onError: params.onError,
  }
})
export const UPLOAD_TEXTURE_SUCCESS = 'UPLOAD_TEXTURE_SUCCESS'
export const uploadTextureSuccess = (params: IAsset) => ({
  type: UPLOAD_TEXTURE_SUCCESS,
  payload: {
    location: params.location,
    mimetype: params.mimetype,
    originalname: params.originalname,
    key: params.key,
  }
})
export const REMOVE_TEXTURE = 'REMOVE_TEXTURE'
export const removeTexture = (key: string) => ({
  type: REMOVE_TEXTURE,
  payload: {
    key,
  }
})

// image
export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const uploadImageRequest = (params: IUploadRequest) => ({
  type: UPLOAD_IMAGE_REQUEST,
  payload: {
    file: params.file,
    onSuccess: params.onSuccess,
    onError: params.onError,
  }
})

export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const uploadImageSuccess = (params: IAsset) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: {
    location: params.location,
    mimetype: params.mimetype,
    originalname: params.originalname,
    key: params.key,
  }
})

export const REMOVE_IMAGE = 'REMOVE_IMAGE'
export const removeImage = (key: string) => ({
  type: REMOVE_IMAGE,
  payload: {
    key,
  }
})

// product
export const REMOVE_PRODUCT_REQUEST = 'REMOVE_PRODUCT_REQUEST'
export const removeProductRequest = (id: number) => ({
  type: REMOVE_PRODUCT_REQUEST,
  payload: {
    id,
  }
})

export const REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS'
export const removeProductSuccess = (id: number) => ({
  type: REMOVE_PRODUCT_SUCCESS,
  payload: { id }
})

interface IFile {
  uid: string
  name: string
  status: 'done'
  url: string
  size: number
  type: string
}
export interface IProductCreate {
  name: string
  images: IFile[]
  categoryId: number
  height: number
  width: number
  depth: number
  description: string
  model: IFile
  textures: IFile[]
}
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST'
export const createProductRequest = (params: IProductCreate) => ({
  type: CREATE_PRODUCT_REQUEST,
  payload: {
    ...params,
    model: convertAntFileToAsset(params.model),
    images: params.images.map(img => convertAntFileToAsset(img)),
    textures: params.textures.map(texture => convertAntFileToAsset(texture)),
  }
})

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const createProduct = (product: IProduct) => ({
  type: CREATE_PRODUCT,
  payload: {
    ...product
  }
})

export const SET_EDITED_PRODUCT = 'SET_EDITED_PRODUCT'
export const setEditedProduct = (id: number) => ({
  type: SET_EDITED_PRODUCT,
  payload: {
    id,
  }
})

export interface IEditRequest extends IProductCreate {
  id: number
}
export const EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST'
export const editProductRequest = (params: IEditRequest) => ({
  type: EDIT_PRODUCT_REQUEST,
  payload: {
    ...params,
    model: convertAntFileToAsset(params.model),
    images: params.images.map(img => convertAntFileToAsset(img)),
    textures: params.textures.map(texture => convertAntFileToAsset(texture)),
  }
})
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS'
export const editProductSuccess = (product: IProduct) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: {
    ...product,
  }
})

export const PRODUCT_PAGINATION_REQUEST = 'PRODUCT_PAGINATION_REQUEST'
export interface IPaginationAction {
  type: typeof PRODUCT_PAGINATION_REQUEST
  payload: IProductPagination
}
export function productPaginationRequest(params: IProductPagination): IPaginationAction {
  return {
    type: PRODUCT_PAGINATION_REQUEST,
    payload: {
      name: params.name,
      categoryId: params.categoryId,
      limit: params.limit || PAGINATION_LIMIT,
      offset: params.offset || 0,
    }
  }
}

export const PRODUCT_PAGINATION_SUCCESS = 'PRODUCT_PAGINATION_SUCCESS'
export interface IPagSuccessParams {
  products: IProduct[]
  count: number
  currentPageNumber: number
}
export function productPaginationSuccess(params: IPagSuccessParams) {
  return {
    type: PRODUCT_PAGINATION_SUCCESS,
    payload: {
      products: params.products,
      count: params.count,
      currentPageNumber: params.currentPageNumber,
    }
  }
}

export const RESET_CURRENT_PAGE_NUMBER = 'RESET_CURRENT_PAGE_NUMBER'
export function resetCurrentPageNumber() {
  return {
    type: CLEAR_PRODUCTS
  }
}

export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS'
export function clearProducts() {
  return {
    type: CLEAR_PRODUCTS
  }
}

export const SET_PRODUCT_SEARCH_NAME = 'SET_PRODUCT_SEARCH_NAME'
export interface IProdNameSearchAction {
  type: typeof SET_PRODUCT_SEARCH_NAME
  payload: { productSearchName: string }
}
export function setProductSearchName(productSearchName: string): IProdNameSearchAction {
  return {
    type: SET_PRODUCT_SEARCH_NAME,
    payload: {
      productSearchName,
    }
  }
}
