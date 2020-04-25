import * as React from 'react'

import ProductForm from '../../../components/ProductForm'
import { initialState as initialProdState } from '../../../redux/product/reducer'

const ProductCreate = ({
  categories,
  images,
  textures,
  model,

  submitBtnText,
  formTitle,
  locale,

  createProduct,
  uploadModel,
  removeModel,

  uploadImage,
  removeImage,

  uploadTexture,
  removeTexture,
}) => (
  <ProductForm
    name=""
    height={initialProdState.productForm.height}
    width={initialProdState.productForm.width}
    depth={initialProdState.productForm.depth}
    categories={categories}
    categoryId={initialProdState.productForm.categoryId}
    images={images}
    description=""
    model={model}
    textures={textures}
    submitBtnText={submitBtnText}
    formTitle={formTitle}
    locale={locale}
    modelWarningMsg=""
    modelErrorMsg=""
    submitHandler={createProduct}
    uploadModel={uploadModel}
    removeModel={removeModel}
    uploadImage={uploadImage}
    removeImage={removeImage}
    uploadTexture={uploadTexture}
    removeTexture={removeTexture}
  />
)

export default ProductCreate
