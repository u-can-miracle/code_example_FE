import * as React from 'react'
import { Redirect } from 'react-router-dom'

import ProductForm from '../../../components/ProductForm'

const ProductCreate = ({
  name,
  description,

  height,
  width,
  depth,

  categoryId,
  images,
  textures,
  model,
  categories,
  locale,

  modelWarningMsg,
  modelErrorMsg,

  submitBtnText,
  formTitle,

  editProductRequest,

  uploadModel,
  removeModel,

  uploadImage,
  removeImage,

  uploadTexture,
  removeTexture,
}) => {
  if(!name) {
    return <Redirect to="/dashboard"/>
  }

  return (
    <ProductForm
      name={name}
      categories={categories}
      height={height}
      width={width}
      depth={depth}
      categoryId={categoryId}
      images={images}
      description={description}
      model={model}
      textures={textures}
      submitBtnText={submitBtnText}
      formTitle={formTitle}
      locale={locale}
      modelWarningMsg={modelWarningMsg}
      modelErrorMsg={modelErrorMsg}
      submitHandler={editProductRequest}
      uploadModel={uploadModel}
      removeModel={removeModel}
      uploadImage={uploadImage}
      removeImage={removeImage}
      uploadTexture={uploadTexture}
      removeTexture={removeTexture}
    />
  )
}

export default ProductCreate
