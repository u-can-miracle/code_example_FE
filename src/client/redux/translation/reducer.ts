import { CHANGE_LOCALE, DEFAULT_LOCALE } from './constants'

interface ITranslation {
  locale: string
}

const initialState: ITranslation = {
  locale: DEFAULT_LOCALE
}

export default function translationReducer(state = initialState, action): ITranslation {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload.locale
      }

    default:
      return state
  }
}
