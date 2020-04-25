import { connect } from 'react-redux'
import Product from './Product'
import { IUploadRequest } from '../../../components/ProductForm'
import { parentCategoriesListSelector } from '../../../redux/category/selector'
import { localeUploadSelector } from '../../../redux/translation/selector'
import getTranslationById from '../../../services/getTranslationById'
import {
  formattedImagesSelector,
  formattedTexturesSelector,
  formattedModelSelector,
} from '../../../redux/product/selector'
import {
  uploadModelRequest,
  removeModel,
  uploadImageRequest,
  removeImage,
  createProductRequest,

  uploadTextureRequest,
  removeTexture,
} from '../../../redux/product/actions'

const mapStateToProps = state => ({
  categories: parentCategoriesListSelector(state),
  images: formattedImagesSelector(state),
  textures: formattedTexturesSelector(state),
  model: formattedModelSelector(state),
  submitBtnText: getTranslationById('productCreateBtn'),
  formTitle: getTranslationById('productCreateTitle'),
  locale: localeUploadSelector()
})

const mapDispatchToProps = dispatch => ({
  createProduct: (params) =>	dispatch(createProductRequest(params)),
  uploadModel: (params: IUploadRequest) =>	dispatch(uploadModelRequest(params)),
  removeModel: () => dispatch(removeModel()),

  uploadImage: (params: IUploadRequest) =>	dispatch(uploadImageRequest(params)),
  removeImage: (key: string) => dispatch(removeImage(key)),

  uploadTexture: (params: IUploadRequest) =>	dispatch(uploadTextureRequest(params)),
  removeTexture: (key: string) => dispatch(removeTexture(key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
