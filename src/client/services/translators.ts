import translationEn from '../../translations/en'
import { mapTranslateWarning, mapTranslateError } from './strings'
import getTranslationById from './getTranslationById'

export const modelWarningTranslator = (str: string) => {
  const result = mapTranslateWarning(str)

  if (result.type === translationEn.largeAsset) {
    const { size, scale } = result

    const largeAssetText = getTranslationById('largeAsset')
    const setScaleText = getTranslationById('setScale')
    const compensateText = getTranslationById('compensate')

    return largeAssetText + size + setScaleText + scale + compensateText
  }

  throw Error(`no such matching for "${str}"`)
}

export const modelErrorTranslator = (str: string) => {
  const result = mapTranslateError(str)

  if (result.type === translationEn.writingHash) {
    const { errPath } = result

    const writingHashText = getTranslationById('writingHash')
    const failedFindText = getTranslationById('failedFind')
    const onDiskText = getTranslationById('onDisk')

    return writingHashText + errPath + failedFindText + errPath + onDiskText
  }

  throw Error(`no such matching for "${str}"`)
}
