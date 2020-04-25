import { addLocaleData } from 'react-intl'
import * as en from 'react-intl/locale-data/en'
import * as ru from 'react-intl/locale-data/ru'

import translationEn from '../../../translations/en'
import translationRu from '../../../translations/ru'

import { LOCALES } from './constants'

addLocaleData(en)
addLocaleData(ru)

const translations = {
  [LOCALES.EN]: translationEn,
  [LOCALES.RU]: translationRu
}

export const getMessagesByLocale = (locale: string) => translations[locale]
