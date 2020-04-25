import { connect } from 'react-redux'
import ProductEdit from './ProductEdit'
import { IUploadRequest } from '../../../components/ProductForm'
import {
  IProductCreate,
  editProductRequest,
  // model
  uploadModelRequest,
  removeModel,
  // image
  uploadImageRequest,
  removeImage,
  // texture
  uploadTextureRequest,
  removeTexture,
} from '../../../redux/product/actions'
import {
  prodNameSelector,
  prodDescriptionSelector,
  prodHeightSelector,
  prodWidthSelector,
  prodDepthSelector,
  prodCategoryIdSelector,
  formattedModelSelector,
  formattedImagesSelector,
  formattedTexturesSelector,
  modelWarningTranslatorSelector,
  modelErrorTranslatorSelector,
} from '../../../redux/product/selector'
import { categoriesSelector } from '../../../redux/category/selector'
import { localeUploadSelector } from '../../../redux/translation/selector'
import getTranslationById from '../../../services/getTranslationById'

const mapStateToProps = (state, props) => ({
  name: prodNameSelector(state),
  description: prodDescriptionSelector(state),
  height: prodHeightSelector(state),
  width: prodWidthSelector(state),
  depth: prodDepthSelector(state),
  categoryId: prodCategoryIdSelector(state),
  images: formattedImagesSelector(state),
  textures: formattedTexturesSelector(state),
  model: formattedModelSelector(state),

  categories: categoriesSelector(state),
  submitBtnText: getTranslationById('productEditBtn'),
  formTitle: getTranslationById('productEditTitle'),
  locale: localeUploadSelector(),

  modelWarningMsg: modelWarningTranslatorSelector(state),
  modelErrorMsg: modelErrorTranslatorSelector(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  editProductRequest: (params: IProductCreate) => dispatch(editProductRequest({
    id: +props.match.params.id,
    ...params,
  })),
  uploadModel: (params: IUploadRequest) =>	dispatch(uploadModelRequest(params)),
  removeModel: () => dispatch(removeModel()),

  uploadImage: (params: IUploadRequest) =>	dispatch(uploadImageRequest(params)),
  removeImage: (key: string) => dispatch(removeImage(key)),

  uploadTexture: (params: IUploadRequest) =>	dispatch(uploadTextureRequest(params)),
  removeTexture: (key: string) => dispatch(removeTexture(key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)
