import {
  CLEAR_FORM,
  // model
  UPLOAD_MODEL_SUCCESS,
  REMOVE_MODEL,
  // image
  UPLOAD_IMAGE_SUCCESS,
  REMOVE_IMAGE,
  // texture
  UPLOAD_TEXTURE_SUCCESS,
  REMOVE_TEXTURE,
  // product
  CREATE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  SET_EDITED_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  PRODUCT_PAGINATION_SUCCESS,
  RESET_CURRENT_PAGE_NUMBER,
  CLEAR_PRODUCTS,
  SET_PRODUCT_SEARCH_NAME,
} from './actions'

import {
  IProduct, IAsset, IModel,
} from '../../interfaces/product'

export interface IState {
  productSearchName: string
  currentPageNumber: number
  allProductsCount: number
  products: IProduct[]
  productForm: {
    name: string
    images: IAsset[]
    categoryId: number | undefined
    height: number
    width: number
    depth: number
    description: string
    model: IModel | undefined
    textures: IAsset[]
  }
}

export const initialState: IState = {
  productSearchName: '',
  currentPageNumber: 1,
  allProductsCount: 0,
  products: [],
  productForm: {
    name: '',
    images: [],
    categoryId: undefined,
    height: 0,
    width: 0,
    depth: 0,
    description: '',
    model: undefined,
    textures: [],
  }
}

export default function productReducer(
  state = initialState,
  action,
): IState {
  switch (action.type) {
    case UPLOAD_MODEL_SUCCESS: {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          model: {
            location: action.payload.location,
            mimetype: action.payload.mimetype,
            originalname: action.payload.originalname,
            key: action.payload.key,
            convertingMessage: {},
          }
        }
      }
    }

    case REMOVE_MODEL: {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          model: undefined,
          textures: [],
        }
      }
    }

    case UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          images: [
            ...state.productForm.images,
            {
              location: action.payload.location,
              mimetype: action.payload.mimetype,
              originalname: action.payload.originalname,
              key: action.payload.key,
            },
          ]
        }
      }
    }

    case REMOVE_IMAGE: {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          images: state.productForm.images.filter(
            ({ key }) => key !== action.payload.key
          ),
        }
      }
    }

    case UPLOAD_TEXTURE_SUCCESS: {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          textures: [
            ...state.productForm.textures,
            {
              location: action.payload.location,
              mimetype: action.payload.mimetype,
              originalname: action.payload.originalname,
              key: action.payload.key,
            },
          ]
        }
      }
    }

    case REMOVE_TEXTURE: {
      return {
        ...state,
        productForm: {
          ...state.productForm,
          textures: state.productForm.textures.filter(
            ({ key }) => key !== action.payload.key
          ),
        }
      }
    }

    case CREATE_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload],
        productForm: initialState.productForm,
      }
    }

    case SET_EDITED_PRODUCT: {
      const prodToEdit = state.products.find(({ id }) => id === action.payload.id)

      if(!prodToEdit) { return state }

      return {
        ...state,
        productForm: {
          name: prodToEdit.name,
          images: prodToEdit.images,
          height: prodToEdit.height,
          width: prodToEdit.width,
          depth: prodToEdit.depth,
          categoryId: prodToEdit.categoryId,
          description: prodToEdit.description,
          model: prodToEdit.model,
          textures: prodToEdit.textures,
        }
      }
    }

    case EDIT_PRODUCT_SUCCESS: {
      const products = state.products.map(prod => {
        return prod.id !== action.payload.id ? prod : action.payload
      })
      return {
        ...state,
        products,
        productForm: initialState.productForm,
      }
    }

    case CLEAR_FORM: {
      return {
        ...state,
        productForm: initialState.productForm,
      }
    }

    case REMOVE_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: state.products.filter(({ id }) => id !== action.payload.id)
      }
    }

    case PRODUCT_PAGINATION_SUCCESS: {
      return {
        ...state,
        products: action.payload.products,
        allProductsCount: action.payload.count,
        currentPageNumber: action.payload.currentPageNumber,
      }
    }

    case RESET_CURRENT_PAGE_NUMBER: {
      return {
        ...state,
        currentPageNumber: initialState.currentPageNumber,
      }
    }

    case CLEAR_PRODUCTS: {
      return {
        ...state,
        products: initialState.products,
      }
    }

    case SET_PRODUCT_SEARCH_NAME: {
      return {
        ...state,
        productSearchName: action.payload.productSearchName,
      }
    }

    default:
      return state
  }
}
