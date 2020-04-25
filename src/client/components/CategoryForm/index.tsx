import * as React from 'react'
import { Formik, Field } from 'formik'
import { Form, Icon, Input, Button, Select } from 'antd'

import { ICategoryBase } from '../../interfaces/category'
import { removeEmptyStringKeys } from '../../services/utils'
import getTranslationById from '../../services/getTranslationById'

const { Option } = Select

interface IValues {
  name: string
  priority: number
  parentCategoryId: number | null
}

function validate(values: IValues) {
  const errors = {
    name: '',
    priority: '',
  }

  if (!values.name) {
    errors.name = getTranslationById('required')
  }

  if (!values.priority) {
    errors.priority = getTranslationById('required')
  } else if (+values.priority < 0){
    errors.priority = getTranslationById('categoryErrPriorityNegative')
  }

  return removeEmptyStringKeys(errors)
}

interface IToParentCategory {
  id: number
  name: string
}
interface IProps {
  name: string
  priority: number
  parentCategoryId: number | null
  submitHandler: (params: ICategoryBase) => void
  submitBtnText: string
  formTitle: string
  toParentCategories: IToParentCategory[]
}

const CategoryForm = (props: IProps) => {
  const {
    submitBtnText,
    formTitle,
    name,
    priority,
    parentCategoryId,
    toParentCategories,
  } = props

  return (
    <Formik
      initialValues={{
        name,
        priority,
        parentCategoryId,
      }}
      onSubmit={(values, actions) => {
        const params = {
          name: values.name,
          priority: +values.priority,
          parentCategoryId: values.parentCategoryId,
        }
        props.submitHandler(params)
        actions.setSubmitting(false)
      }}
      validate={validate}
      render={({
        values,
        errors,
        dirty,
        status,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        isValidating,
        setValues,
      }) => {

        const getStatus = (error, touch) => {
          return error && touch ? 'error' : ''
        }

        const getHelpMsg = (error, touch) => {
          return error && touch ? error : ''
        }

        return (
          <form
            onSubmit={handleSubmit}
            className="dashboard-content"
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
                  placeholder={getTranslationById('categoryName')}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                validateStatus={getStatus(errors.priority, touched.priority)}
                help={getHelpMsg(errors.priority, touched.priority)}
              >
                <Input
                  type="number"
                  prefix={<Icon
                    type="rise"
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />}
                  placeholder={getTranslationById('categoryPriority')}
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </div>

            <Field
              name="parentCategoryId"
              render={() => (
                <Select
                  className="category-form-parent-category"
                  defaultValue={values.parentCategoryId}
                  placeholder={getTranslationById('categorySelectParentCategory')}
                  onChange={value => setFieldValue('parentCategoryId', value)}
                >
                {toParentCategories.map(c => (
                  <Option
                    key={c.id}
                    value={c.id}
                  >
                    {c.name}
                  </Option>
                ))}
                </Select>
              )}
            />

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
  )
}

export default CategoryForm
