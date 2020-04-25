import * as React from 'react'
import { Formik, Field } from 'formik'
import {
  Form,
  Icon,
  Input,
  InputNumber,
  Button,
  Select,
  Upload,
  Modal,
  Alert,
  Typography,
} from 'antd'
import classnames from 'classnames'

import { removeEmptyStringKeys } from '../../services/utils'
import getTranslationById from '../../services/getTranslationById'
import { assetToFile } from '../../services/formatters'
import { ICategory } from '../../interfaces/category'
import { IAsset } from '../../interfaces/product'

import { RcCustomRequestOptions } from 'antd/lib/upload/interface'

const { Text } = Typography
const { Option } = Select
const { TextArea } = Input

const TEXTURE_MAX_COUNT = 8

export interface IFile {
  uid: string
  name: string
  status: 'done'
  url: string
  size: number
  type: string
}

// export interface IAntUploadFile {
//   lastModified: number
//   lastModifiedDate: string
//   name: string
//   size: number
//   type: string
//   uid: string
//   webkitRelativePath: string
// }

interface IOption {
  onProgress: (event: { percent: number }) => void
  onError: (event: Error, body?: any) => void
  onSuccess: (body: any) => void
  data: any
  filename: string
  file: File
  // file: IAntUploadFile
  withCredentials: boolean
  action: string
  headers: any
}

export interface IUploadRequest {
  // file: IAntUploadFile
  file: File
  onSuccess: (asset: IAsset) => void
  onError: (err: Error) => void
}

interface ILocale {
  uploading: string
  removeFile: string
  uploadError: string
  previewFile: string
}

interface IValues {
  name: string
  images: IFile[]
  height: number
  width: number
  depth: number
  categoryId: number | undefined
  description: string
  model: IFile
  textures: IFile[]
}

function validate(values: IValues) {
  const errors = {
    name: '',
    images: '',
    categoryId: '',
    description: '',
    model: '',
    height: '',
    width: '',
    depth: '',
  }

  if (!values.name) {
    errors.name = getTranslationById('required')
  }

  if (Number(values.height) === 0) {
    errors.height = getTranslationById('productSizeError')
  }

  if (Number(values.width) === 0) {
    errors.width = getTranslationById('productSizeError')
  }

  if (Number(values.depth) === 0) {
    errors.depth = getTranslationById('productSizeError')
  }

  if (!values.images.length) {
    errors.images = getTranslationById('required')
  }

  if (!values.categoryId) {
    errors.categoryId = getTranslationById('required')
  }

  if (!values.description) {
    errors.description = getTranslationById('required')
  }

  if (!values.model) {
    errors.model = getTranslationById('required')
  }

  return removeEmptyStringKeys(errors)
}

interface IProps extends IValues {
  categories: ICategory[]
  submitHandler: (param: IValues) => void
  uploadModel: (params: IUploadRequest) => void
  removeModel: () => void
  uploadImage: (params: IUploadRequest) => void
  removeImage: (key: string) => void
  uploadTexture: (params: IUploadRequest) => void
  removeTexture: (key: string) => void
  formTitle: string
  submitBtnText: string
  locale: ILocale
  modelWarningMsg: string
  modelErrorMsg: string
}

interface IState {
  isVisible: boolean
  previewImage: string
  imgName: string
}

const initialState: IState = {
  isVisible: false,
  previewImage: '',
  imgName: '',
}

const ProductForm = (props: IProps) => {
  const {
    name,
    description,
    categories,
    categoryId,
    images,
    model,
    textures,

    height,
    width,
    depth,

    formTitle,
    submitBtnText,
    locale,

    uploadModel,
    removeModel,
    uploadImage,
    removeImage,
    uploadTexture,
    removeTexture,
    modelWarningMsg,
    modelErrorMsg,
  } = props

  const [previewState, setPreмiewState] = React.useState(initialState)

  function handlePreview(file: IFile) {
    setPreмiewState({
      isVisible: true,
      previewImage: file.url,
      imgName: file.name,
    })
  }

  function handleCancel() {
    setPreмiewState(initialState)
  }

  function verifyNoModelNotification() {
    if (!model) {
      Modal.info({
        title: getTranslationById('productModelVerificationTitle'),
        content: (
          <div>
            <p>{getTranslationById('productModelVerificationContent')}</p>
          </div>
        ),
        maskClosable: true,
      })
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          name,
          images,
          categoryId,
          description,
          model,
          textures,
          height,
          width,
          depth,
        }}
        onSubmit={(values, actions) => {
          props.submitHandler({
            name: values.name,
            images: values.images,
            height: values.height,
            width: values.width,
            depth: values.depth,
            categoryId: values.categoryId,
            description: values.description,
            model: values.model,
            textures: values.textures,
          })
          actions.setSubmitting(false)
        }}
        validate={validate}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => {
          const getStatus = (error, touch) => {
            return error && touch ? 'error' : ''
          }

          const getHelpMsg = (error, touch) => {
            return error && touch ? error : ''
          }

          const uploadButton = (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">{getTranslationById('uploadUploading')}</div>
            </div>
          )

          return (
            <form
              onSubmit={ev => {
                ev.preventDefault()
                handleSubmit()
              }}
              className="dashboard-content product-form"
            >
              <h4 className="category-form-title">{formTitle}</h4>

              <div className="padding-wrapper">
                <Form.Item
                  validateStatus={getStatus(errors.name, touched.name)}
                  help={getHelpMsg(errors.name, touched.name)}
                >
                  <Input
                    prefix={<Icon
                      type="container"
                      style={{ color: 'rgba(0,0,0,.25)' }}
                    />}
                    placeholder={getTranslationById('productName')}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                <div>
                  <Form.Item
                    validateStatus={getStatus(errors.height, touched.height)}
                    help={getHelpMsg(errors.height, touched.height)}
                  >
                    <Text strong>
                      {getTranslationById('productHeight')}
                    </Text>
                    <InputNumber
                      className="product-form--size-input"
                      min={0}
                      max={15}
                      step={0.001}
                      defaultValue={height}
                      name="height"
                      onChange={value => setFieldValue('height', value)}
                    />
                  </Form.Item>
                  <Form.Item
                    validateStatus={getStatus(errors.width, touched.width)}
                    help={getHelpMsg(errors.width, touched.width)}
                  >
                    <Text strong>
                      {getTranslationById('productWidth')}
                    </Text>
                    <InputNumber
                      className="product-form--size-input"
                      min={0}
                      max={15}
                      step={0.001}
                      defaultValue={width}
                      name="width"
                      onChange={value => setFieldValue('width', value)}
                    />
                  </Form.Item>

                  <Form.Item
                    validateStatus={getStatus(errors.depth, touched.depth)}
                    help={getHelpMsg(errors.depth, touched.depth)}
                  >
                    <Text strong>
                      {getTranslationById('productDepth')}
                    </Text>
                    <InputNumber
                      className="product-form--size-input"
                      min={0}
                      max={15}
                      step={0.001}
                      defaultValue={depth}
                      name="depth"
                      onChange={value => setFieldValue('depth', value)}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  validateStatus={getStatus(errors.images, touched.images)}
                  help={getHelpMsg(errors.images, touched.images)}
                >
                  <Text strong>
                    {getTranslationById('productImageLabel')}
                  </Text>
                  <div className="clearfix" />
                  <Upload
                    accept={'.jpeg, .jpg, .png'}
                    locale={locale}
                    customRequest={(option: RcCustomRequestOptions) => {
                      uploadImage({
                        file: option.file,
                        onSuccess: (asset) => {
                          option.onSuccess(asset, option.file)
                          const file = assetToFile(asset)
                          values.images.push(file)
                          setFieldValue('images', values.images)
                        },
                        onError: (err) => {
                          option.onError(err)
                        },
                      })
                    }}
                    listType="picture-card"
                    fileList={images}
                    onPreview={handlePreview}
                    onRemove={({ uid: key }) => {
                      removeImage(key)
                      setFieldValue('images', images.filter(img => img.uid !== key))
                    }}
                  >
                    {images.length >= 3 ? null : uploadButton}
                  </Upload>
                </Form.Item>

                <Form.Item
                  validateStatus={getStatus(errors.categoryId, touched.categoryId)}
                  help={getHelpMsg(errors.categoryId, touched.categoryId)}
                >
                  <Select
                    className="product-form-parent-category"
                    defaultValue={values.categoryId}
                    placeholder={getTranslationById('categorySelectParentCategory')}
                    onChange={value => setFieldValue('categoryId', value)}
                  >
                  {categories.map(c => (
                    <Option
                      key={c.id}
                      value={c.id}
                    >
                      {c.name}
                    </Option>
                  ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  validateStatus={getStatus(errors.description, touched.description)}
                  help={getHelpMsg(errors.description, touched.description)}
                >
                  <TextArea
                    rows={3}
                    placeholder={getTranslationById('productDescription')}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>

                <Form.Item
                  validateStatus={getStatus(errors.model, touched.model)}
                  help={getHelpMsg(errors.model, touched.model)}
                >
                  <Field
                    name="model"
                    render={() => (
                      <Upload
                        accept={'.fbx, .obj'}
                        locale={locale}
                        fileList={model && [model]}
                        customRequest={(option: IOption) => {
                          uploadModel({
                            file: option.file,
                            onSuccess: (asset) => {
                              option.onSuccess(asset)
                              const file = assetToFile(asset)
                              setFieldValue('model', file)
                            },
                            onError: (err) => {
                              option.onError(err)
                            },
                          })
                        }}
                        onRemove={() => {
                          removeModel()
                          setFieldValue('model', undefined)
                        }}
                      >
                        <Button>
                          <Icon type="upload" />
                          {getTranslationById('productModelBtn')}
                        </Button>
                      </Upload>
                    )}
                  />
                  {model && !modelErrorMsg && (
                    <div>
                      <Icon
                        className="icon icon-success"
                        type="check-circle"
                      />
                      {getTranslationById('successfullyConverted')}
                    </div>
                  )}
                  {modelWarningMsg && (
                    <div>
                      <Icon
                        type="exclamation-circle"
                        className="icon icon-warning"
                      />
                      {modelWarningMsg}
                    </div>
                  )}
                  {modelErrorMsg && (
                    <div>
                      <Icon
                        type="close-circle"
                        className="icon icon-error"
                      />
                      {modelErrorMsg}
                    </div>
                  )}
                </Form.Item>

                <Form.Item>
                  <div
                    onClick={verifyNoModelNotification}
                  >
                    <Text strong>
                      {getTranslationById('productTextureUploadLabel')}
                    </Text>
                    <div className="clearfix" />
                    <Upload
                      accept={'.jpeg, .jpg, .png, .mtl'}
                      locale={locale}
                      disabled={!model}
                      className={classnames({ disabled: !model })}
                      customRequest={(option: IOption) => {
                        uploadTexture({
                          file: option.file,
                          onSuccess: (asset) => {
                            option.onSuccess(asset)
                            const file = assetToFile(asset)
                            values.textures.push(file)
                            setFieldValue('textures', values.textures)
                          },
                          onError: (err) => {
                            option.onError(err)
                          },
                        })
                      }}
                      listType="picture-card"
                      fileList={textures}
                      onPreview={handlePreview}
                      onRemove={({ uid: key }) => {
                        removeTexture(key)
                        setFieldValue('textures', textures.filter(img => img.uid !== key))
                      }}
                    >
                      {textures.length >= TEXTURE_MAX_COUNT ? null : uploadButton}
                    </Upload>

                    <Alert
                      message={getTranslationById('productTextureAlertTitle')}
                      description={getTranslationById('productTextureAlertDescription')}
                      type="info"
                      showIcon
                     />
                  </div>
                </Form.Item>
              </div>
              {status && status.msg && <div>{status.msg}</div>}

              <Button
                htmlType="submit"
                disabled={isSubmitting}
              >
                {submitBtnText}
              </Button>
            </form>
          )
        }}
      />

      <Modal
        visible={previewState.isVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt={previewState.imgName}
          style={{ width: '100%' }}
          src={previewState.previewImage}
        />
      </Modal>
    </div>
  )
}

export default ProductForm
