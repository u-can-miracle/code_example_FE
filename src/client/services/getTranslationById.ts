import EN from '../../translations/en'
import RU from '../../translations/ru'
import getSingletoneStore from '../redux/store/get.singletone.store'
import { localeSelector } from '../redux/translation/selector'

const translation = {
  EN,
  RU,
}

function getTranslationById(id: string): string {
  const store = getSingletoneStore()
  const state = store.getState()
  const locale = localeSelector(state)

  return translation[locale][id]
}

export default getTranslationById
