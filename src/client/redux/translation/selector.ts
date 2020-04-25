import { createSelector } from 'reselect'

import { getMessagesByLocale } from './utils'
import getTranslationById from '../../services/getTranslationById'

export const localeSelector = createSelector(
  (state: any) => state.translation.locale,
  locale => locale
)

export const intlMessagesSelector = createSelector(
  localeSelector,
  locale => getMessagesByLocale(locale)
)

export const localeUploadSelector = () => ({
  uploading: getTranslationById('uploadUploading'),
  removeFile: getTranslationById('uploadRemoveFile'),
  uploadError: getTranslationById('uploadError'),
  previewFile: getTranslationById('uploadPreviewFile'),
})
