import getTranslationById from './getTranslationById'
import { countriesDataSource, getCitiesByCountryName } from './location'

export const isEmail = (value: string) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
}

export const stringLimitField = (msg: string, length: number = 2) => (rule, value, callback) => {
  if (value.length < length) {
    callback(getTranslationById(msg))
  }
  callback()
}

export const validateUserName = stringLimitField('userNameLengthErr')

export const validateCompanyName = stringLimitField('compNameLengthError')

export const validateEmail = (rule, value, callback) => {
  if (!isEmail(value)) {
    callback(getTranslationById('emailInvalid'))
  }

  callback()
}

export const validateCountry = (rule, value, callback) => {
  if (!countriesDataSource.find(c => c === value)){
    callback(getTranslationById('countryWrongError'))
  }

  callback()
}

export const validateCity = (selectedCountry: string) => (rule, value, callback) => {
  const cities = getCitiesByCountryName(selectedCountry)

  if (!cities.find(c => c === value)){
    callback(getTranslationById('cityWrongError'))
  }

  callback()
}

export const validatePhone = (rule, value, callback) => {
  const maybeNaN = +value

  if (isNaN(maybeNaN)) {
    callback(getTranslationById('phoneNotNumbericErr'))
  }

  callback()
}
